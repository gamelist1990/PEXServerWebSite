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

export type MinecraftSoundEntry = {
  key: string;
  namespacedKey: string;
  category: string;
  subtitleKey?: string;
  subtitle?: string;
  previewPath?: string;
  previewUrl?: string;
  sampleCount: number;
  hasNestedEvent: boolean;
  stream: boolean;
};
