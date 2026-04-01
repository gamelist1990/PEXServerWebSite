import type { BedrockTextureEntry } from "../../app/types";

export function buildJavaExport(entries: BedrockTextureEntry[]) {
  const lines = ["package org.example.koukunn.pexserver.Module.GUI.BedrockTexture;", "", "public final class Icon {"];
  for (const entry of entries) {
    lines.push(`    public static final String ${entry.constant} = "${entry.texture}";`);
  }
  lines.push("", "    private Icon() {", "    }", "}", "");
  return lines.join("\n");
}

export function buildTsExport(entries: BedrockTextureEntry[]) {
  const lines = ["export const Icon = {"];
  for (const entry of entries) {
    lines.push(`  ${entry.constant}: "${entry.texture}",`);
  }
  lines.push("} as const;", "", "export type IconKey = keyof typeof Icon;", "export type IconPath = (typeof Icon)[IconKey];", "");
  return lines.join("\n");
}
