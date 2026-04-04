export type ServerStatus = {
  online?: boolean;
  version?: string;
  software?: string;
  gamemode?: string;
  players?: {
    online?: number;
    max?: number;
  };
  motd?: {
    clean?: string[];
  };
  protocol?: {
    name?: string;
    version?: number;
  };
};

export type FeatureCard = {
  eyebrow: string;
  title: string;
  body: string;
};

export type GuideStep = {
  title: string;
  body: string;
  image: string;
};

export type ToolCard = {
  eyebrow: string;
  title: string;
  body: string;
  to: string;
  metric: string;
};

export type BedrockTextureEntry = {
  constant: string;
  texture: string;
  asset: string;
  webAsset: string;
};

export type MinecraftSoundVariant =
  | string
  | {
      name: string;
      type?: string;
      stream?: boolean;
      volume?: number;
      pitch?: number;
      weight?: number;
      preload?: boolean;
      attenuation_distance?: number;
    };

export type MinecraftSoundDefinition = {
  sounds?: MinecraftSoundVariant[];
  subtitle?: string;
  replace?: boolean;
};

export type MinecraftLanguageMap = Record<string, string>;

export type SoundEdition = "java" | "bedrock";

export type MinecraftSoundEntry = {
  edition: SoundEdition;
  key: string;
  commandKey: string;
  namespacedKey?: string;
  category: string;
  subtitleKey?: string;
  subtitle?: string;
  previewPath?: string;
  previewUrl?: string;
  sampleCount: number;
  hasNestedEvent: boolean;
  stream: boolean;
};

export type BedrockSoundVariant =
  | string
  | {
      name: string;
      load_on_low_memory?: boolean;
      pitch?: number;
      volume?: number;
      weight?: number;
    };

export type BedrockSoundDefinition = {
  category?: string;
  max_distance?: number | null;
  min_distance?: number | null;
  sounds?: BedrockSoundVariant[];
  subtitle?: string;
  __use_legacy_max_distance?: string;
};

export type BedrockSoundDefinitionDocument = {
  format_version?: string;
  sound_definitions: Record<string, BedrockSoundDefinition>;
};

export type BedrockVersionInfo = {
  latest?: {
    version: string;
    date: string;
  };
};
