import { useEffect, useState } from "react";
import type { BedrockTextureEntry } from "../app/types";
import { bedrockTextureCount, bedrockTextureDataPath } from "../data/generated/bedrockTextureMeta";
import { buildJavaExport, buildTsExport } from "../features/bedrock-textures/exporters";

export function BedrockTexturePage() {
  const [entries, setEntries] = useState<BedrockTextureEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [query, setQuery] = useState("");
  const [exportFormat, setExportFormat] = useState<"java" | "ts">("java");
  const [selectedEntry, setSelectedEntry] = useState<BedrockTextureEntry | null>(null);
  const [statusMessage, setStatusMessage] = useState("待機中");

  useEffect(() => {
    let mounted = true;

    const loadEntries = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}${bedrockTextureDataPath}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = (await response.json()) as BedrockTextureEntry[];
        if (!mounted) {
          return;
        }
        setEntries(data);
      } catch {
        if (!mounted) {
          return;
        }
        setStatusMessage("テクスチャデータを取得できません");
      } finally {
        if (mounted) {
          setLoadingEntries(false);
        }
      }
    };

    loadEntries();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (statusMessage === "待機中") {
      return undefined;
    }
    const timer = window.setTimeout(() => setStatusMessage("待機中"), 2200);
    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  const filteredEntries = query.trim()
    ? entries.filter((entry) => {
        const searchText = `${entry.constant} ${entry.texture} ${entry.asset}`.toLowerCase();
        return searchText.includes(query.trim().toLowerCase());
      })
    : entries;

  const exportSource = exportFormat === "ts" ? buildTsExport(entries) : buildJavaExport(entries);

  const handleCopy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatusMessage(message);
    } catch {
      setStatusMessage("コピーに失敗しました");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exportSource], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = exportFormat === "ts" ? "Icon.ts" : "Icon.java";
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage(`${link.download} を保存しました`);
  };

  const formatCopyValue = (entry: BedrockTextureEntry) => `Icon.${entry.constant}`;

  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Tools / Bedrock Texture Explorer</p>
        <h2> Bedrock Texture Explorer</h2>
        <p className="section-text">
          <strong>textures</strong>textures 全体から自動生成したデータです。カードをクリックすると定数名をコピーでき、Java 用 <strong>Icon.java</strong> と TypeScript 用 <strong>Icon.ts</strong> を切り替えてエクスポートできます。
        </p>
      </section>

      <section className="panel texture-control-panel">
        <div className="texture-toolbar">
          <input
            className="texture-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="定数名 / texture path / asset path で検索"
            type="search"
            value={query}
          />
          <div className="texture-action-row">
            <button
              className={exportFormat === "java" ? "secondary-button is-selected-button" : "secondary-button"}
              onClick={() => setExportFormat("java")}
              type="button"
            >
              Java
            </button>
            <button
              className={exportFormat === "ts" ? "secondary-button is-selected-button" : "secondary-button"}
              onClick={() => setExportFormat("ts")}
              type="button"
            >
              TypeScript
            </button>
            <button
              className="primary-button"
              onClick={() => handleCopy(exportSource, `${exportFormat === "ts" ? "Icon.ts" : "Icon.java"} をコピーしました`)}
              type="button"
            >
              エクスポート内容をコピー
            </button>
            <button className="secondary-button" onClick={handleDownload} type="button">
              ファイル保存
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                if (!selectedEntry) {
                  setStatusMessage("先にカードを選択してください");
                  return;
                }
                handleCopy(formatCopyValue(selectedEntry), `${formatCopyValue(selectedEntry)} をコピーしました`);
              }}
              type="button"
            >
              選択中の定数をコピー
            </button>
          </div>
          <textarea className="texture-export-box" readOnly value={exportSource} />
        </div>
      </section>

      <section className="texture-stats-grid">
        <div className="spotlight-item">
          <span>Total</span>
          <strong>{bedrockTextureCount}</strong>
        </div>
        <div className="spotlight-item">
          <span>Filtered</span>
          <strong>{loadingEntries ? "Loading..." : filteredEntries.length}</strong>
        </div>
        <div className="spotlight-item">
          <span>Selected</span>
          <strong>{selectedEntry ? selectedEntry.constant : "なし"}</strong>
        </div>
        <div className="spotlight-item">
          <span>Status</span>
          <strong>{statusMessage}</strong>
        </div>
      </section>

      <section className="texture-grid">
        {loadingEntries ? (
          <div className="panel texture-empty-state">
            <p className="panel-label">Loading</p>
            <h2>テクスチャデータを読み込んでいます</h2>
            <p className="section-text">初回は画像数が多いので少しだけ時間がかかります。</p>
          </div>
        ) : null}
        {filteredEntries.map((entry) => {
          const isSelected = selectedEntry?.constant === entry.constant;
          return (
            <button
              className={isSelected ? "texture-card is-selected" : "texture-card"}
              key={entry.constant}
              onClick={() => {
                setSelectedEntry(entry);
                handleCopy(formatCopyValue(entry), `${formatCopyValue(entry)} をコピーしました`);
              }}
              type="button"
            >
              <img
                className="texture-card-image"
                src={`${import.meta.env.BASE_URL}${entry.webAsset}`}
                alt={entry.constant}
                loading="lazy"
              />
              <div className="texture-card-body">
                <h3>{entry.constant}</h3>
                <p>{entry.texture}</p>
                <code className="texture-asset-code">{entry.asset}</code>
              </div>
            </button>
          );
        })}
      </section>
    </section>
  );
}
