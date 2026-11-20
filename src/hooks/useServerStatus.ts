import { useEffect, useState } from "react";
import { REFRESH_INTERVAL } from "../app/constants";
import { servers } from "../app/servers";
import type { ServerStatus } from "../app/types";
import {
  fetchServerStatuses,
  type ServerStatusesResult,
} from "../lib/apiClient";

/**
 * Server statuses are fetched through the pexserver API
 * (apiClient -> status.get) instead of calling mcsrvstat from the browser.
 * The endpoint argument is kept as the selector for which server/edition
 * the caller wants, so existing call sites do not change.
 */
let cached: { data: ServerStatusesResult; time: number } | null = null;
let pending: Promise<ServerStatusesResult> | null = null;

function requestStatuses(): Promise<ServerStatusesResult> {
  if (cached && Date.now() - cached.time < REFRESH_INTERVAL) {
    return Promise.resolve(cached.data);
  }
  if (pending) return pending;
  pending = fetchServerStatuses()
    .then((data) => {
      cached = { data, time: Date.now() };
      return data;
    })
    .finally(() => {
      pending = null;
    });
  return pending;
}

function resolveTarget(endpoint: string): { id: string; edition: "java" | "bedrock" } | null {
  const server = servers.find((candidate) => endpoint.includes(candidate.address));
  if (!server) return null;
  return {
    id: server.id,
    edition: endpoint.includes("/bedrock/") ? "bedrock" : "java",
  };
}

export function useServerStatus(endpoint: string) {
  const [state, setState] = useState<{
    status: ServerStatus | null;
    loading: boolean;
    error: string;
  }>({ status: null, loading: true, error: "" });
  useEffect(() => {
    let mounted = true;
    setState({ status: null, loading: true, error: "" });
    const update = async () => {
      try {
        const target = resolveTarget(endpoint);
        if (!target) throw new Error("Unknown status endpoint");
        const all = await requestStatuses();
        const status = all.servers[target.id]?.[target.edition];
        if (!status || typeof status.online !== "boolean")
          throw new Error("Invalid status response");
        if (mounted) setState({ status, loading: false, error: "" });
      } catch {
        if (mounted)
          setState({
            status: null,
            loading: false,
            error: "現在ステータスを取得できません。",
          });
      }
    };
    void update();
    const timer = window.setInterval(update, REFRESH_INTERVAL);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [endpoint]);
  return state;
}
