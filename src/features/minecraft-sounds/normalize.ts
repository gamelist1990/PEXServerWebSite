import type {
  MinecraftLanguageMap,
  MinecraftSoundDefinition,
  MinecraftSoundEntry,
  MinecraftSoundVariant
} from "../../app/types";
import { minecraftSoundAssetVersion } from "../../data/generated/minecraftSoundMeta";

const minecraftSoundBaseUrl = `https://assets.mcasset.cloud/${minecraftSoundAssetVersion}/assets/minecraft/sounds`;

function resolvePreviewVariant(variants: MinecraftSoundVariant[] | undefined) {
  let hasNestedEvent = false;
  let stream = false;

  if (!variants?.length) {
    return {
      previewPath: undefined,
      previewUrl: undefined,
      hasNestedEvent,
      stream,
      sampleCount: 0
    };
  }

  for (const variant of variants) {
    if (typeof variant === "string") {
      const previewPath = variant.replace(/^minecraft:/, "");
      return {
        previewPath,
        previewUrl: `${minecraftSoundBaseUrl}/${previewPath}.ogg`,
        hasNestedEvent,
        stream,
        sampleCount: variants.length
      };
    }

    if (variant.type === "event") {
      hasNestedEvent = true;
      continue;
    }

    if (!variant.name) {
      continue;
    }

    stream = Boolean(variant.stream);
    const previewPath = variant.name.replace(/^minecraft:/, "");
    return {
      previewPath,
      previewUrl: `${minecraftSoundBaseUrl}/${previewPath}.ogg`,
      hasNestedEvent,
      stream,
      sampleCount: variants.length
    };
  }

  return {
    previewPath: undefined,
    previewUrl: undefined,
    hasNestedEvent,
    stream,
    sampleCount: variants.length
  };
}

export function buildMinecraftSoundEntries(
  definitions: Record<string, MinecraftSoundDefinition>,
  languageMap: MinecraftLanguageMap
) {
  return Object.entries(definitions)
    .map(([key, definition]): MinecraftSoundEntry => {
      const category = key.includes(".") ? key.slice(0, key.indexOf(".")) : key;
      const preview = resolvePreviewVariant(definition.sounds);

      return {
        key,
        namespacedKey: `minecraft:${key}`,
        category,
        subtitleKey: definition.subtitle,
        subtitle: definition.subtitle ? languageMap[definition.subtitle] : undefined,
        previewPath: preview.previewPath,
        previewUrl: preview.previewUrl,
        sampleCount: preview.sampleCount,
        hasNestedEvent: preview.hasNestedEvent,
        stream: preview.stream
      };
    })
    .sort((left, right) => left.key.localeCompare(right.key));
}
