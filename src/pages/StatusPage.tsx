import { BEDROCK_STATUS_ENDPOINT, JAVA_STATUS_ENDPOINT, SERVER_ADDRESS } from "../app/constants";
import { StatusCard } from "../components/status/StatusCard";
import { useServerStatus } from "../hooks/useServerStatus";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function StatusPage() {
  useMetaTags(pageMetadata['/status']);
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
