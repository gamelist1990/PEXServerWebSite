import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { staffMembers } from "./data/staff";

const SERVER_ADDRESS = "pexserver.mooo.com";
const DISCORD_INVITE_URL = "https://discord.gg/cvVY5fHueW";
const JAVA_STATUS_ENDPOINT = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`;
const BEDROCK_STATUS_ENDPOINT = `https://api.mcsrvstat.us/bedrock/3/${SERVER_ADDRESS}:25565`;
const REFRESH_INTERVAL = 60000;

type ServerStatus = {
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

type FeatureCard = {
  eyebrow: string;
  title: string;
  body: string;
};

type MetricCardProps = {
  label: string;
  value: string | number;
};

const featureCards: FeatureCard[] = [
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

const bedrockServerAddSteps = [
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

const bedrockFriendAddSteps = [
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

const javaJoinSteps = [
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

function App() {
  return (
    <HashRouter>
      <div className="page-shell">
        <div className="page-noise" />
        <SiteHeader />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/staff" element={<StaffPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="topbar">
        <NavLink className="brand" to="/">
          <img className="brand-logo" src={`${import.meta.env.BASE_URL}server.png`} alt="PEXserver logo" />
          <div className="brand-copy">
            <span className="brand-title">PEXserver</span>
            <span className="brand-subtitle">Minecraft Network</span>
          </div>
        </NavLink>
        <button
          aria-expanded={menuOpen}
          aria-label="メニューを開く"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`topbar-links ${menuOpen ? "is-open" : ""}`}>
          <NavItem to="/" onNavigate={closeMenu}>
            Home
          </NavItem>
          <NavItem to="/status" onNavigate={closeMenu}>
            Status
          </NavItem>
          <NavItem to="/guide" onNavigate={closeMenu}>
            Guide
          </NavItem>
          <NavItem to="/about" onNavigate={closeMenu}>
            About
          </NavItem>
          <NavItem to="/staff" onNavigate={closeMenu}>
            Staff
          </NavItem>
          <a className="nav-link" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Discord
          </a>
        </div>
      </nav>
    </header>
  );
}

function NavItem({ to, children, onNavigate }: { to: string; children: string; onNavigate?: () => void }) {
  return (
    <NavLink className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")} onClick={onNavigate} to={to}>
      {children}
    </NavLink>
  );
}

function HomePage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_ADDRESS);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="page-grid page-grid-home">
      <section className="hero-copy">
        <div className="hero-visual">
          <img className="hero-cover" src={`${import.meta.env.BASE_URL}server-header.png`} alt="PEXserver server view" />
          <div className="hero-overlay">
            <p className="eyebrow">Official Website</p>
            <h1>PEXserver</h1>
            <p className="hero-subtitle">Minecraft Java/Bedrock で運営している小規模のマイクラサーバー</p>
          </div>
        </div>
        <div className="hero-meta">
        <div className="hero-meta-item">
          <span>Address</span>
          <strong><code className="inline-code">{SERVER_ADDRESS}</code></strong>
        </div>
        <div className="hero-meta-item">
          <span>Bedrock Port</span>
          <strong><code className="inline-code">25565</code></strong>
        </div>
          <div className="hero-meta-item">
            <span>Overview</span>
            <strong>Home / Status / Guide / About / Staff</strong>
          </div>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={handleCopy} type="button">
            {copied ? "アドレスをコピーしました" : "アドレスをコピー"}
          </button>
          <NavLink className="secondary-button" to="/guide">
            参加方法を見る
          </NavLink>
          <NavLink className="secondary-button" to="/status">
            稼働状況を見る
          </NavLink>
          <a className="secondary-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Discord に参加
          </a>
        </div>
      </section>

      <section className="panel spotlight-panel">
        <p className="panel-label">Quick Access</p>
        <h2 className="spotlight-title">参加前に確認したい情報</h2>
        <div className="spotlight-list">
          <SpotlightItem title="Server Address" body={SERVER_ADDRESS} />
          <SpotlightItem title="Main Content" body="PvP / MiniGame / Community" />
          <SpotlightItem title="Discord" body="連絡や参加案内に利用できます" />
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Highlights</p>
          <h2>PEXserver で遊べる事</h2>
        </div>
        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <p className="card-eyebrow">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function StatusPage() {
  const javaStatus = useServerStatus(JAVA_STATUS_ENDPOINT);
  const bedrockStatus = useServerStatus(BEDROCK_STATUS_ENDPOINT);

  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Live Status</p>
        <h2>現在のサーバー稼働状況</h2>
        <p className="section-text">
          <strong>mcsrvstat.us</strong>から Java 版と Bedrock 版の公開情報を分けて取得しています。
        </p>
      </section>

      <div className="dual-status-grid">
        <StatusCard
          title="Java Edition"
          panelLabel="Java Snapshot"
          statusState={javaStatus}
          fallbackSoftware="Paper"
          addressLabel={SERVER_ADDRESS}
          portLabel="25565"
        />
        <StatusCard
          title="Bedrock Edition"
          panelLabel="Bedrock Snapshot"
          statusState={bedrockStatus}
          fallbackSoftware="Bedrock"
          addressLabel={SERVER_ADDRESS}
          portLabel="25565"
        />
      </div>
    </section>
  );
}

function GuidePage() {
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Join Guide</p>
        <h2>初見でも迷わない参加手順</h2>
        <p className="section-text">
          画像付きで総合版と Java 版の参加方法を分けて掲載しています。接続前に Status と Discord もあわせて確認できます。
        </p>
      </section>

      <section className="guide-section">
        <div className="guide-copy">
          <p className="eyebrow">Bedrock</p>
          <h2>総合版の参加方法</h2>
          <p className="section-text">
            まずは外部サーバー追加方式です。アドレスは <code className="inline-code">{SERVER_ADDRESS}</code>、ポートは <code className="inline-code">25565</code> を使います。
          </p>
        </div>
        <div className="guide-steps-grid">
          {bedrockServerAddSteps.map((step) => (
            <GuideStepCard key={`bedrock-server-${step.title}`} title={step.title} body={step.body} image={step.image} />
          ))}
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-copy">
          <p className="eyebrow">Bedrock</p>
          <h2>フレンド経由の参加方法</h2>
          <p className="section-text">
            外部サーバー追加方式が使いにくい場合は、フレンド経由でも参加できます。
          </p>
        </div>
        <div className="guide-steps-grid">
          {bedrockFriendAddSteps.map((step) => (
            <GuideStepCard key={`bedrock-friend-${step.title}`} title={step.title} body={step.body} image={step.image} />
          ))}
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-copy">
          <p className="eyebrow">Java</p>
          <h2>Java 版の参加方法</h2>
          <p className="section-text">
            Java 版ではマルチプレイからサーバーを追加して参加します。アドレスは <code className="inline-code">{SERVER_ADDRESS}</code> です。
          </p>
        </div>
        <div className="guide-steps-grid">
          {javaJoinSteps.map((step) => (
            <GuideStepCard key={`java-${step.title}`} title={step.title} body={step.body} image={step.image} />
          ))}
        </div>
      </section>

      <section className="notes-panel">
        <p className="eyebrow">Notes</p>
        <h2>接続前の確認</h2>
        <p>
          先に Discord を確認しておくと、連絡や案内を追いやすくなります。稼働確認は Status ページでまとめて見られます。
        </p>
        <a className="secondary-button inline-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
          Discord を開く
        </a>
      </section>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">About PEXserver</p>
        <h2>PEXserver について</h2>
        <p className="section-text">
          このページでは、PEXserver で遊べる内容や参加しやすさを中心に、サーバーの特徴をわかりやすくまとめています。
        </p>
      </section>

      <section className="feature-grid">
        {featureCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <p className="card-eyebrow">{card.eyebrow}</p>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

function StaffPage() {
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Staff</p>
        <h2>運営者一覧</h2>
        <p className="section-text">
          PEXserver の運営メンバーを掲載するページです。アイコン、名前、一言、YouTube、X をまとめて表示できます。
        </p>
      </section>

      {staffMembers.length === 0 ? (
        <section className="panel staff-empty">
          <p className="panel-label">No Staff Yet</p>
          <h2>運営者データはこれから追加できます。</h2>
          <p className="section-text">
            `src/data/staff.ts` にメンバー情報を追加すると、このページへカード形式で表示されます。
          </p>
        </section>
      ) : (
        <section className="staff-grid">
          {staffMembers.map((member) => (
            <article className="staff-card" key={member.id}>
              <img className="staff-icon" src={member.icon} alt={`${member.name} icon`} />
              <div className="staff-body">
                <h3>{member.name}</h3>
                <p>{member.message}</p>
                <div className="staff-links">
                  {member.youtubeUrl ? (
                    <a className="staff-link" href={member.youtubeUrl} target="_blank" rel="noreferrer">
                      <SocialIcon type="youtube" />
                      <span>YouTube</span>
                    </a>
                  ) : null}
                  {member.xUrl ? (
                    <a className="staff-link" href={member.xUrl} target="_blank" rel="noreferrer">
                      <SocialIcon type="x" />
                      <span>X</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}

function SpotlightItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="spotlight-item">
      <span>{title}</span>
      <strong>{body}</strong>
    </div>
  );
}

function GuideStepCard({ title, body, image }: { title: string; body: string; image: string }) {
  return (
    <article className="guide-step-card">
      <img className="guide-step-image" src={image} alt={title} />
      <div className="guide-step-body">
        <p className="panel-label">{title}</p>
        <p>{body}</p>
      </div>
    </article>
  );
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SocialIcon({ type }: { type: "youtube" | "x" }) {
  if (type === "youtube") {
    return (
      <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
        <path
          d="M23 12.01c0-2.08-.19-4.16-.57-6.18a3.08 3.08 0 0 0-2.16-2.17C18.31 3.1 15.15 3 12 3s-6.31.1-8.27.66A3.08 3.08 0 0 0 1.57 5.83C1.19 7.85 1 9.93 1 12.01c0 2.08.19 4.16.57 6.18a3.08 3.08 0 0 0 2.16 2.17c1.96.56 5.12.66 8.27.66s6.31-.1 8.27-.66a3.08 3.08 0 0 0 2.16-2.17c.38-2.02.57-4.1.57-6.18Z"
          fill="currentColor"
        />
        <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
      <path
        d="M18.9 2H21l-4.59 5.25L21.8 22h-4.9l-3.84-5.03L8.66 22H6.55l4.9-5.6L2.2 2h5.02l3.47 4.58L18.9 2Zm-1.72 18h1.36L6.48 3.9H5.03l12.15 16.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

type StatusCardProps = {
  title: string;
  panelLabel: string;
  statusState: ReturnType<typeof useServerStatus>;
  fallbackSoftware: string;
  addressLabel: string;
  portLabel: string;
};

function StatusCard({ title, panelLabel, statusState, fallbackSoftware, addressLabel, portLabel }: StatusCardProps) {
  const { status, loading, error } = statusState;
  const online = Boolean(status?.online);
  const playerCount = status?.players?.online ?? 0;
  const maxPlayers = status?.players?.max ?? "?";
  const version = status?.protocol?.name || status?.version || "Unknown";
  const motd = status?.motd?.clean?.join(" ") || "PEXserver";
  const software = status?.software || status?.gamemode || fallbackSoftware;

  return (
    <aside className="status-panel">
      <div className="status-panel-header">
        <div>
          <p className="panel-label">{panelLabel}</p>
          <h2>{title}</h2>
        </div>
        <span className={`pulse ${online ? "is-online" : "is-offline"}`} />
      </div>

      <div className="status-banner">
        <span>{loading ? "Checking..." : online ? "稼働中" : "停止中"}</span>
        <strong>
          {playerCount} / {maxPlayers}
        </strong>
      </div>

      <div className="status-grid">
        <MetricCard label="Version" value={version} />
        <MetricCard label="Software" value={software} />
        <MetricCard label="Address" value={addressLabel} />
        <MetricCard label="Port" value={portLabel} />
      </div>

      <div className="motd-card">
        <p className="panel-label">MOTD</p>
        <p>{motd}</p>
      </div>

      {error ? <p className="status-error">{error}</p> : null}
    </aside>
  );
}

function useServerStatus(endpoint: string) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = (await response.json()) as ServerStatus;
        if (!mounted) {
          return;
        }
        setStatus(data);
        setError("");
      } catch {
        if (!mounted) {
          return;
        }
        setError("現在ステータスを取得できません。");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStatus();
    const timer = window.setInterval(fetchStatus, REFRESH_INTERVAL);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [endpoint]);

  return { status, loading, error };
}

export default App;
