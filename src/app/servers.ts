import type { ServerStatus } from "./types";
export const servers = [
  {
    id: "network",
    name: "PEXserver",
    label: "PvP & Mini Games",
    address: "pexserver.com",
    description:
      "一瞬の勝負も、みんなで遊ぶ時間も。Duel・Pot PvP・20種類以上のミニゲーム。",
    fallbackVersion: "26.3",
    bedrockPort: 25565,
  },
  {
    id: "survival",
    name: "PEXSurvival",
    label: "Survival",
    address: "play.pexserver.com",
    description:
      "自分のペースで、冒険を続けよう。探索も建築も楽しめるサバイバルサーバー。",
    fallbackVersion: "26.3",
    bedrockPort: 19132,
  },
] as const;
export type ServerConfig = (typeof servers)[number];
export function statusEndpoint(server: ServerConfig, bedrock = false) {
  return bedrock
    ? `https://api.mcsrvstat.us/bedrock/3/${server.address}:${server.bedrockPort}`
    : `https://api.mcsrvstat.us/3/${server.address}`;
}
export function detectedVersion(status: ServerStatus | null) {
  return status?.online
    ? status.version?.trim() || status.protocol?.name?.trim() || null
    : null;
}
