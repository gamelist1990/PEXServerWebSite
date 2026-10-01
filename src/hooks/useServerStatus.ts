import { useEffect, useState } from "react";
import { REFRESH_INTERVAL } from "../app/constants";
import type { ServerStatus } from "../app/types";
const requests = new Map<string, Promise<ServerStatus>>();
const cache = new Map<string, { data: ServerStatus; time: number }>();
function requestStatus(endpoint: string) {
  const saved = cache.get(endpoint);
  if (saved && Date.now() - saved.time < REFRESH_INTERVAL)
    return Promise.resolve(saved.data);
  const pending = requests.get(endpoint);
  if (pending) return pending;
  const request = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as ServerStatus;
      if (typeof data.online !== "boolean")
        throw new Error("Invalid status response");
      cache.set(endpoint, { data, time: Date.now() });
      return data;
    } finally {
      window.clearTimeout(timeout);
      requests.delete(endpoint);
    }
  })();
  requests.set(endpoint, request);
  return request;
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
        const status = await requestStatus(endpoint);
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
