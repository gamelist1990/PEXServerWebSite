import { bedrockTextureCount } from "./generated/bedrockTextureMeta";
import { SERVER_ADDRESS } from "../app/constants";
import type { FeatureCard, GuideStep, ToolCard } from "../app/types";

export const featureCards: FeatureCard[] = [
  {
    eyebrow: "PvP",
    title: "Duel や Pot 系の対戦を遊べる",
    body: "真剣な 1v1、テンポの速い Pot 系 PvP、ルールの違う対戦モードまで、対人戦を中心に幅広く遊べます。"
  },
  {
    eyebrow: "Mini Games",
    title: "気軽に入れるミニゲーム群",
    body: "KnockBack 系、ArrowFight、BlockDrop、DontFall、MurderMystery など、短時間でも遊びやすいゲームを用意しています。"
  },
  {
    eyebrow: "SkyGen",
    title: "SkyGen x survival",
    body: "現在開発中ですが、SkyGen をベースにしたサバイバルコンテンツも予定しています。PvP やミニゲームとは違う遊び方を提供できればと思います。"
  }
];

export const toolCards: ToolCard[] = [
  {
    eyebrow: "Visual Tool",
    title: "Bedrock Texture Explorer",
    body: "Bedrock vanilla のテクスチャを検索して、`Icon.XXXX` や texture path をその場でコピーできます。",
    to: "/tools/bedrock-textures",
    metric: `${bedrockTextureCount} textures`
  }
];

export const bedrockServerAddSteps: GuideStep[] = [
  {
    title: "Step 1",
    body: "総合版のサーバー追加画面を開いて、外部サーバー追加方式の準備をします。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/ServerAdd/Step1.png`
  },
  {
    title: "Step 2",
    body: "サーバー名やアドレスを入力する画面へ進みます。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/ServerAdd/Step2.png`
  },
  {
    title: "Step 3",
    body: `アドレスに ${SERVER_ADDRESS}、ポートに 25565 を設定します。`,
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/ServerAdd/Step3.png`
  },
  {
    title: "Step 4",
    body: "保存したサーバーを選んで接続します。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/ServerAdd/Step4.png`
  }
];

export const bedrockFriendAddSteps: GuideStep[] = [
  {
    title: "Step 1",
    body: "フレンド経由で参加するため、まずフレンド追加の導線を開きます。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/FriendAdd/Step1.png`
  },
  {
    title: "Step 2",
    body: "フレンド検索や追加の画面へ進みます。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/FriendAdd/Step2.png`
  },
  {
    title: "Step 3",
    body: "参加に必要なフレンド情報を確認して追加します。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/FriendAdd/Step3.png`
  },
  {
    title: "Step 4",
    body: "ゲーム内フレンド一覧から参加可能な状態を確認します。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/FriendAdd/Step4.png`
  },
  {
    title: "Step 5",
    body: "フレンドから参加してね。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Bedrock/FriendAdd/Step5.png`
  }
];

export const javaJoinSteps: GuideStep[] = [
  {
    title: "Step 1",
    body: "Java 版でマルチプレイ画面を開きます。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Java/Step1.png`
  },
  {
    title: "Step 2",
    body: "サーバー追加から接続先情報を入力する画面へ進みます。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Java/Step2.png`
  },
  {
    title: "Step 3",
    body: `サーバーアドレスに ${SERVER_ADDRESS} を入力します。`,
    image: `${import.meta.env.BASE_URL}JoinGuild/Java/Step3.png`
  },
  {
    title: "Step 4",
    body: "保存したサーバーを選択して接続します。",
    image: `${import.meta.env.BASE_URL}JoinGuild/Java/Step4.png`
  }
];
