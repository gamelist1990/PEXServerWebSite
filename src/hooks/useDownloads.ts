import { useEffect, useState } from "react";
import {
  downloadResources,
  type DownloadResource,
} from "../data/downloads";
import { fetchDownloadsCatalog } from "../lib/apiClient";

/**
 * The distribution catalog is read at runtime from the pexserver API
 * (apiClient -> downloads.get) so the site no longer depends on data
 * pulled from GitHub during CI builds.
 *
 * The bundled static catalog (src/data/generated/downloads.json) remains
 * as the initial value and the fallback: if the API is unreachable or
 * returns an unexpected shape, the bundled copy keeps the pages intact.
 * The bundled copy also stays authoritative for routing, SEO metadata
 * and the static pre-render, which are all generated at build time.
 */
let cached: DownloadResource[] | null = null;
let pending: Promise<DownloadResource[]> | null = null;

function isValidResource(value: unknown): value is DownloadResource {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    Array.isArray(record.links)
  );
}

function requestDownloads(): Promise<DownloadResource[]> {
  if (cached) return Promise.resolve(cached);
  if (pending) return pending;
  pending = fetchDownloadsCatalog()
    .then((catalog) => {
      if (
        !catalog ||
        !Array.isArray(catalog.resources) ||
        catalog.resources.length === 0 ||
        !catalog.resources.every(isValidResource)
      ) {
        throw new Error("Invalid downloads response");
      }
      cached = catalog.resources;
      return cached;
    })
    .finally(() => {
      pending = null;
    });
  return pending;
}

export function useDownloads(): DownloadResource[] {
  const [resources, setResources] = useState<DownloadResource[]>(
    () => cached ?? downloadResources,
  );
  useEffect(() => {
    let mounted = true;
    requestDownloads()
      .then((fresh) => {
        if (mounted) setResources(fresh);
      })
      .catch(() => {
        // API unavailable: keep the bundled static catalog.
      });
    return () => {
      mounted = false;
    };
  }, []);
  return resources;
}
