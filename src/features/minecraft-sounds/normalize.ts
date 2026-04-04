import type {
  BedrockSoundDefinition,
  BedrockSoundDefinitionDocument,
  BedrockSoundVariant,
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
        edition: "java",
        key,
        commandKey: `minecraft:${key}`,
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

function resolveBedrockPreviewVariant(variants: BedrockSoundVariant[] | undefined) {
  if (!variants?.length) {
    return {
      previewPath: undefined,
      sampleCount: 0
    };
  }

  for (const variant of variants) {
    if (typeof variant === "string") {
      return {
        previewPath: variant,
        sampleCount: variants.length
      };
    }

    if (variant.name) {
      return {
        previewPath: variant.name,
        sampleCount: variants.length
      };
    }
  }

  return {
    previewPath: undefined,
    sampleCount: variants.length
  };
}

export function buildBedrockSoundEntries(
  document: BedrockSoundDefinitionDocument,
  languageMap: MinecraftLanguageMap
) {
  const definitions = document.sound_definitions ?? {};

  return Object.entries(definitions)
    .map(([key, definition]: [string, BedrockSoundDefinition]): MinecraftSoundEntry => {
      const preview = resolveBedrockPreviewVariant(definition.sounds);

      return {
        edition: "bedrock",
        key,
        commandKey: key,
        category: definition.category ?? (key.includes(".") ? key.slice(0, key.indexOf(".")) : key),
        subtitleKey: definition.subtitle,
        subtitle: definition.subtitle ? languageMap[definition.subtitle] : undefined,
        previewPath: preview.previewPath,
        previewUrl: undefined,
        sampleCount: preview.sampleCount,
        hasNestedEvent: false,
        stream: false
      };
    })
    .sort((left, right) => left.key.localeCompare(right.key));
}
