import { useSearchParams } from "react-router-dom";
import { servers, statusEndpoint, detectedVersion } from "../app/servers";
import { CopyAddress } from "../components/common/CopyAddress";
import { useServerStatus } from "../hooks/useServerStatus";
import { DISCORD_INVITE_URL } from "../app/constants";
import { GuideStepCard } from "../components/common/GuideStepCard";
import {
  bedrockFriendAddSteps,
  bedrockServerAddSteps,
  javaJoinSteps,
} from "../data/siteContent";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function GuidePage() {
  useMetaTags(pageMetadata["/guide"]);
  const [params, setParams] = useSearchParams();
  const server =
    servers.find((item) => item.id === params.get("server")) || servers[0];
  const { status } = useServerStatus(statusEndpoint(server));
  const version = detectedVersion(status);
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Join Guide</p>
        <h1>初見でも迷わない参加手順</h1>
        <p className="section-text">
          画像付きで総合版と Java 版の参加方法を分けて掲載しています。接続前に
          Status と Discord もあわせて確認できます。
        </p>
      </section>

      <section className="join-selector panel">
        <p className="eyebrow">SELECT YOUR SERVER</p>
        <h2>接続先を選ぶ</h2>
        <div className="download-filter">
          {servers.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={server.id === item.id}
              className={server.id === item.id ? "selected" : ""}
              onClick={() => setParams({ server: item.id })}
            >
              {item.name} / {item.label}
            </button>
          ))}
        </div>
        <CopyAddress address={server.address} />
        <p className="section-text">
          Java公開バージョン：
          {version || `${server.fallbackVersion}（参考・未取得）`} /
          Bedrockポート：{server.bedrockPort}
        </p>
        <p className="directory-note">
          Bedrockの接続可否はステータスページをご確認ください。画像はPEXserverの入力例です。選択した接続先のアドレスに置き換えてください。
        </p>
      </section>

      <section className="guide-section">
        <div className="guide-copy">
          <p className="eyebrow">Bedrock</p>
          <h2>総合版の参加方法</h2>
          <p className="section-text">
            まずは外部サーバー追加方式です。アドレスは{" "}
            <code className="inline-code">{server.address}</code>、ポートは{" "}
            <code className="inline-code">{server.bedrockPort}</code>{" "}
            を使います。
          </p>
        </div>
        <div className="guide-steps-grid">
          {bedrockServerAddSteps.map((step) => (
            <GuideStepCard
              key={`bedrock-server-${step.title}`}
              title={step.title}
              body={step.body
                .split("pexserver.com")
                .join(server.address)
                .replace("25565", String(server.bedrockPort))}
              image={step.image}
            />
          ))}
        </div>
      </section>

      {server.id === "network" && (
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
              <GuideStepCard
                key={`bedrock-friend-${step.title}`}
                title={step.title}
                body={step.body.split("pexserver.com").join(server.address)}
                image={step.image}
              />
            ))}
          </div>
        </section>
      )}

      <section className="guide-section">
        <div className="guide-copy">
          <p className="eyebrow">Java</p>
          <h2>Java 版の参加方法</h2>
          <p className="section-text">
            Java 版ではマルチプレイからサーバーを追加して参加します。アドレスは{" "}
            <code className="inline-code">{server.address}</code> です。
          </p>
        </div>
        <div className="guide-steps-grid">
          {javaJoinSteps.map((step) => (
            <GuideStepCard
              key={`java-${step.title}`}
              title={step.title}
              body={step.body.split("pexserver.com").join(server.address)}
              image={step.image}
            />
          ))}
        </div>
      </section>

      <section className="notes-panel">
        <p className="eyebrow">Notes</p>
        <h2>接続前の確認</h2>
        <p>
          先に Discord
          を確認しておくと、連絡や案内を追いやすくなります。稼働確認は Status
          ページでまとめて見られます。
        </p>
        <a
          className="secondary-button inline-button"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Discord を開く
        </a>
      </section>
    </section>
  );
}
