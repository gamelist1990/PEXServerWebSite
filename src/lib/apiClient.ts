import {
  createTrafficClientHello,
  openTraffic,
  sealTraffic,
  type TrafficKeys,
  type TrafficWelcome,
} from "@pexserver/secure-envelope/traffic";
import type { ServerStatus } from "../app/types";
import type { DownloadResource } from "../data/downloads";

/**
 * Thin client for the pexserver API (api.pexserver.com).
 *
 * Every call goes through the PEXSecureEnvelope traffic protocol:
 *   1. POST /v1/session/hello  — ECDH handshake, short-lived session (10 min)
 *   2. POST /v1/call           — one sealed packet per operation, packetId is single-use
 * Raw JSON requests are never accepted by the server. When the server reports
 * this client as banned, an ApiBannedError is thrown and ban listeners are
 * notified so the UI can show the warning dialog.
 *
 * The base URL can be overridden at build time with VITE_API_BASE_URL
 * (e.g. http://127.0.0.1:8787 for local development).
 */
const API_BASE_URL = (
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "https://api.pexserver.com"
).replace(/\/$/, "");

export interface ApiBanInfo {
  reason: string;
  bannedUntil: number;
  retryAfterSeconds: number;
}

export class ApiBannedError extends Error {
  readonly info: ApiBanInfo;
  constructor(info: ApiBanInfo) {
    super(info.reason);
    this.name = "ApiBannedError";
    this.info = info;
  }
}

export class ApiUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiUnavailableError";
  }
}

export interface ServerStatusesResult {
  servers: Record<string, { java: ServerStatus; bedrock: ServerStatus }>;
  fetchedAt: number;
}

type BanListener = (info: ApiBanInfo) => void;
const banListeners = new Set<BanListener>();
let currentBan: ApiBanInfo | null = null;

export function subscribeApiBan(listener: BanListener): () => void {
  banListeners.add(listener);
  return () => {
    banListeners.delete(listener);
  };
}

export function getCurrentBan(): ApiBanInfo | null {
  if (currentBan && currentBan.bannedUntil <= Date.now()) currentBan = null;
  return currentBan;
}

function notifyBan(info: ApiBanInfo): void {
  currentBan = info;
  for (const listener of banListeners) listener(info);
}

function parseBan(body: unknown): ApiBanInfo | null {
  if (typeof body !== "object" || body === null) return null;
  const record = body as Record<string, unknown>;
  if (record.banned !== true) return null;
  return {
    reason:
      typeof record.reason === "string"
        ? record.reason
        : "アクセスが一時的に制限されています。",
    bannedUntil:
      typeof record.bannedUntil === "number" ? record.bannedUntil : Date.now(),
    retryAfterSeconds:
      typeof record.retryAfterSeconds === "number" ? record.retryAfterSeconds : 0,
  };
}

let sessionPromise: Promise<TrafficKeys> | null = null;

async function hello(): Promise<TrafficKeys> {
  const client = await createTrafficClientHello();
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/v1/session/hello`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(client.hello),
    });
  } catch {
    throw new ApiUnavailableError("APIへ接続できませんでした。");
  }
  if (response.status === 403) {
    const ban = parseBan(await response.json().catch(() => null));
    if (ban) {
      notifyBan(ban);
      throw new ApiBannedError(ban);
    }
  }
  if (!response.ok) {
    throw new ApiUnavailableError(`セッションの確立に失敗しました (HTTP ${response.status})`);
  }
  const welcome = (await response.json()) as TrafficWelcome;
  return client.complete(welcome);
}

function ensureSession(forceNew: boolean): Promise<TrafficKeys> {
  if (forceNew || !sessionPromise) {
    sessionPromise = hello().catch((error: unknown) => {
      sessionPromise = null;
      throw error;
    });
  }
  return sessionPromise;
}

interface CallEnvelope {
  ok: boolean;
  result?: unknown;
  error?: string;
}

/**
 * Runs one API operation over the sealed traffic channel.
 * On a rejected call (expired/unknown session, spent packet) the session is
 * re-established once and the operation retried with a fresh packet.
 */
export async function apiCall<T>(operation: string): Promise<T> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const keys = await ensureSession(attempt === 1);
    if (keys.expiresAt <= Date.now() + 5_000) {
      if (attempt === 0) continue;
      throw new ApiUnavailableError("セッションの有効期限が切れています。");
    }
    const packet = await sealTraffic({ operation }, keys, "request");
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/v1/call`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: keys.sessionId, packet }),
      });
    } catch {
      throw new ApiUnavailableError("APIへ接続できませんでした。");
    }
    if (response.status === 403) {
      const ban = parseBan(await response.json().catch(() => null));
      if (ban) {
        notifyBan(ban);
        throw new ApiBannedError(ban);
      }
      throw new ApiUnavailableError("APIへのアクセスが拒否されました。");
    }
    if (response.status === 400) {
      // Uniform rejection: session expired/unknown or packet problem.
      // Drop the session and retry once with a fresh handshake.
      sessionPromise = null;
      if (attempt === 0) continue;
      throw new ApiUnavailableError("APIリクエストが拒否されました。");
    }
    if (!response.ok) {
      throw new ApiUnavailableError(`APIリクエストに失敗しました (HTTP ${response.status})`);
    }
    const body = (await response.json().catch(() => null)) as {
      packet?: unknown;
    } | null;
    if (typeof body?.packet !== "string") {
      throw new ApiUnavailableError("API応答の形式が不正です。");
    }
    const opened = await openTraffic<CallEnvelope>(body.packet, keys, "response");
    if (!opened.value.ok) {
      throw new ApiUnavailableError(opened.value.error ?? "APIエラーが発生しました。");
    }
    return opened.value.result as T;
  }
  throw new ApiUnavailableError("APIリクエストに失敗しました。");
}

/** status.get — statuses for every server, shaped like ServerStatus. */
export function fetchServerStatuses(): Promise<ServerStatusesResult> {
  return apiCall<ServerStatusesResult>("status.get");
}

export interface DownloadsCatalogResult {
  schemaVersion?: number;
  updatedAt?: string;
  resources: DownloadResource[];
}

/**
 * downloads.get — the distribution catalog, served by the API instead of
 * being read from GitHub at build/CI time. Callers are expected to fall
 * back to the bundled static catalog when this rejects.
 */
export function fetchDownloadsCatalog(): Promise<DownloadsCatalogResult> {
  return apiCall<DownloadsCatalogResult>("downloads.get");
}
