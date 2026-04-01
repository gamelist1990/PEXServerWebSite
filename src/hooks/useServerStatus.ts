import { useEffect, useState } from "react";
import { REFRESH_INTERVAL } from "../app/constants";
import type { ServerStatus } from "../app/types";

export function useServerStatus(endpoint: string) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = (await response.json()) as ServerStatus;
        if (!mounted) {
          return;
        }
        setStatus(data);
        setError("");
      } catch {
        if (!mounted) {
          return;
        }
        setError("現在ステータスを取得できません。");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStatus();
    const timer = window.setInterval(fetchStatus, REFRESH_INTERVAL);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [endpoint]);

  return { status, loading, error };
}
