import { SERVER_ADDRESS } from "../app/constants";
import type { FeatureCard, GameMode, GuideStep, ServerFact } from "../app/types";

// 以下の紹介文は PEXserver 本体プラグイン（Paper / src/main/java/.../pexserver）の
// 実装（Project/Game/Games, Project/Pot, Project/customItem/Duel）を参照して記載しています。

export const featureCards: FeatureCard[] = [
  {
    eyebrow: "1v1 Duel",
    title: "本格的なランクマッチ Duel",
    body: "Duel システムはマッチメイキング・観戦・再戦・戦績記録に対応した 1v1 対戦です。専用サイドバーやキットプリセットを備え、実力を competitive に測れます。"
  },
  {
    eyebrow: "Pot PvP",
    title: "Sumo / Pot 系のスピード対戦",
    body: "Sumo・MinePot・AbilityPot など、テンポの速い Pot 系 PvP を用意。ノックバックで押し出す Sumo から、能力を使う AbilityPot まで遊び方を選べます。"
  },
  {
    eyebrow: "Party Games",
    title: "20 種類以上のミニゲーム",
    body: "BlockParty・GlassBridge・SuperSpleef・人狼RPG・MurderMystery など、大人数で気軽に遊べるミニゲームを多数実装しています。"
  }
];

export const gameModes: GameMode[] = [
  {
    name: "Duel",
    category: "PvP",
    body: "マッチメイキング・観戦・再戦・戦績記録に対応した 1v1 対戦。キット選択と専用サイドバーで真剣勝負を楽しめます。",
    tags: ["1v1", "Matchmaking", "Stats"]
  },
  {
    name: "Pot PvP",
    category: "PvP",
    body: "Sumo・MinePot・AbilityPot をまとめた Pot 系対戦。押し出しや能力を使ったテンポの速い戦いが中心です。",
    tags: ["Sumo", "MinePot", "AbilityPot"]
  },
  {
    name: "KnockBack",
    category: "PvP",
    body: "ノックバック特化の対戦。相手を場外へ弾き飛ばして落とすシンプルながら奥深いモードです。",
    tags: ["Knockback", "Arena"]
  },
  {
    name: "ArrowFight",
    category: "PvP",
    body: "弓での撃ち合いを中心にしたアリーナ対戦。エイムと立ち回りが勝敗を分けます。",
    tags: ["Bow", "Arena"]
  },
  {
    name: "Minerant",
    category: "Team",
    body: "4vs4 のチーム戦。Valorant をテーマにした爆弾の設置・解除を攻守に分かれて競います。",
    tags: ["4v4", "Bomb", "Team"]
  },
  {
    name: "MineHut",
    category: "Chase",
    body: "コンパスで対象を追うハンター系ゲーム。逃げる側と追う側に分かれて駆け引きを楽しみます。",
    tags: ["Hunter", "Compass"]
  },
  {
    name: "MurderMystery",
    category: "Party",
    body: "探偵・犯人・市民に分かれる推理ゲーム。誰が犯人かを見抜きながら生き残りを目指します。",
    tags: ["推理", "役職"]
  },
  {
    name: "人狼RPG",
    category: "Party",
    body: "人狼をベースにした RPG 風モード。役職・ショップ・ステージ要素を組み合わせて遊べます。",
    tags: ["人狼", "Role", "Shop"]
  },
  {
    name: "DontFall / BlockDrop",
    category: "Party",
    body: "足場が崩れる中で耐えるサバイバル系。踏んだブロックが時間で崩れる BlockDrop も収録しています。",
    tags: ["Survival", "落下"]
  },
  {
    name: "MiniGame Collection",
    category: "Party",
    body: "BlockParty・GlassBridge・SuperSpleef・RussianRoulette・Snake など 20 種類以上のパーティゲーム集。",
    tags: ["20+ games", "大人数"]
  }
];

export const serverFacts: ServerFact[] = [
  { label: "Platform", value: "Java / Bedrock 両対応" },
  { label: "Servers", value: "PvP / Mini Games + Survival" },
  { label: "Core", value: "Paper Plugin (Java 25)" },
  { label: "Bridge", value: "Geyser / Floodgate" }
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
