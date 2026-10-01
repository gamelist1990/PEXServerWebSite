import catalog from "./generated/downloads.json";
export interface DownloadResource {
  id: string;
  name: string;
  shareTitle: string;
  eyebrow: string;
  kind: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  version: string;
  publishedAt?: string;
  releaseUrl?: string;
  tags: string[];
  note: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
    download?: string;
  }[];
}
export const downloadResources: DownloadResource[] = catalog.resources;
export const resourcePath = (resource: DownloadResource) =>
  `/downloads/geyser/${resource.id}`;
