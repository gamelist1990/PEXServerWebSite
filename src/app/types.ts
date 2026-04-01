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
