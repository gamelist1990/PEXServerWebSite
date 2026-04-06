import { useEffect, useRef, useState } from "react";
import type {
  BedrockSoundDefinitionDocument,
  BedrockVersionInfo,
  MinecraftLanguageMap,
  MinecraftSoundDefinition,
  MinecraftSoundEntry,
  SoundEdition
} from "../app/types";
import {
  bedrockSoundDefinitionsUrl,
  bedrockVersionInfoUrl,
  minecraftSoundAssetVersion,
  minecraftSoundDataUrl,
  minecraftSoundLanguageUrl
} from "../data/generated/minecraftSoundMeta";
import { buildBedrockSoundEntries, buildMinecraftSoundEntries } from "../features/minecraft-sounds/normalize";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function MinecraftSoundPage() {
  useMetaTags(pageMetadata['/tools/sounds']);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [javaEntries, setJavaEntries] = useState<MinecraftSoundEntry[]>([]);
  const [bedrockEntries, setBedrockEntries] = useState<MinecraftSoundEntry[]>([]);
  const [edition, setEdition] = useState<SoundEdition>("java");
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<MinecraftSoundEntry | null>(null);
  const [statusMessage, setStatusMessage] = useState("待機中");
  const [previewVolume, setPreviewVolume] = useState(100);
  const [previewPitch, setPreviewPitch] = useState(100);
  const [javaSource, setJavaSource] = useState("master");
  const [bedrockVersionLabel, setBedrockVersionLabel] = useState("Loading...");

  const previewAudioVolume = Math.min(Math.max(previewVolume / 100, 0), 1);
  const previewAudioPitch = Math.min(Math.max(previewPitch / 100, 0.5), 2);

  useEffect(() => {
    let mounted = true;

    const loadEntries = async () => {
      try {
        const [soundResponse, languageResponse, bedrockResponse, bedrockVersionResponse] = await Promise.all([
          fetch(minecraftSoundDataUrl, { cache: "no-store" }),
          fetch(minecraftSoundLanguageUrl, { cache: "no-store" }),
          fetch(bedrockSoundDefinitionsUrl, { cache: "no-store" }),
          fetch(bedrockVersionInfoUrl, { cache: "no-store" })
        ]);

        if (!soundResponse.ok || !languageResponse.ok || !bedrockResponse.ok || !bedrockVersionResponse.ok) {
          throw new Error(
            `HTTP ${soundResponse.status} / ${languageResponse.status} / ${bedrockResponse.status} / ${bedrockVersionResponse.status}`
          );
        }

        const definitions = (await soundResponse.json()) as Record<string, MinecraftSoundDefinition>;
        const languageMap = (await languageResponse.json()) as MinecraftLanguageMap;
        const bedrockDocument = (await bedrockResponse.json()) as BedrockSoundDefinitionDocument;
        const bedrockVersionInfo = (await bedrockVersionResponse.json()) as BedrockVersionInfo;
        const normalizedJavaEntries = buildMinecraftSoundEntries(definitions, languageMap);
        const normalizedBedrockEntries = buildBedrockSoundEntries(bedrockDocument, languageMap);

        if (!mounted) {
          return;
        }

        setJavaEntries(normalizedJavaEntries);
        setBedrockEntries(normalizedBedrockEntries);
        if (bedrockVersionInfo.latest?.version) {
          setBedrockVersionLabel(bedrockVersionInfo.latest.version);
        }
      } catch {
        if (!mounted) {
          return;
        }

        setStatusMessage("サウンドデータを取得できません");
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
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = previewAudioVolume;
    audio.playbackRate = previewAudioPitch;
  }, [previewAudioPitch, previewAudioVolume]);

  useEffect(() => {
    if (statusMessage === "待機中") {
      return undefined;
    }

    const timer = window.setTimeout(() => setStatusMessage("待機中"), 2200);
    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  useEffect(() => {
    setSelectedEntry(null);
  }, [edition]);

  const entries = edition === "java" ? javaEntries : bedrockEntries;

  const filteredEntries = query.trim()
    ? entries.filter((entry) => {
        const searchText = [
          entry.key,
          entry.namespacedKey,
          entry.category,
          entry.subtitleKey,
          entry.subtitle,
          entry.previewPath
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchText.includes(query.trim().toLowerCase());
      })
    : entries;

  const handleCopy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatusMessage(message);
    } catch {
      setStatusMessage("コピーに失敗しました");
    }
  };

  const playEntry = async (entry: MinecraftSoundEntry) => {
    const audio = audioRef.current;
    if (!audio) {
      setStatusMessage("オーディオの初期化に失敗しました");
      return;
    }

        if (!entry.previewUrl) {
      setStatusMessage("このサウンドは直接プレビューできません");
      return;
    }

    audio.pause();
    audio.src = entry.previewUrl;
    audio.currentTime = 0;
    audio.volume = previewAudioVolume;
    audio.playbackRate = previewAudioPitch;

    try {
      await audio.play();
      setStatusMessage(`${entry.namespacedKey} を再生中`);
    } catch {
      setStatusMessage("ブラウザが再生をブロックしました");
    }
  };

  const handleSelect = (entry: MinecraftSoundEntry) => {
    setSelectedEntry(entry);
    if (entry.edition === "java") {
      void playEntry(entry);
      return;
    }
    setStatusMessage(`${entry.commandKey} を選択しました`);
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setStatusMessage("プレビューを停止しました");
  };

  const commandSample = selectedEntry
    ? selectedEntry.edition === "java"
      ? `/playsound ${selectedEntry.commandKey} ${javaSource} @s ~ ~ ~ ${(previewVolume / 100).toFixed(2)} ${(previewPitch / 100).toFixed(2)}`
      : `/playsound ${selectedEntry.commandKey} @s ~ ~ ~ ${(previewVolume / 100).toFixed(2)} ${(previewPitch / 100).toFixed(2)} 0.00`
    : "";

  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Tools / Minecraft Sound Explorer</p>
        <h2>Minecraft Sound Explorer</h2>
        <p className="section-text">
          Java と Bedrock を切り替えながら、各 Edition のサウンドイベント名と <strong>/playsound</strong> 構文を別々に確認できます。
          Java 側はその場でプレビュー再生、Bedrock 側は <strong>sound_definitions.json</strong> 基準でイベント名を確認できます。
        </p>
      </section>

      <section className="panel sound-control-panel">
        <div className="sound-toolbar">
          <div className="texture-action-row">
            <button
              className={edition === "java" ? "secondary-button is-selected-button" : "secondary-button"}
              onClick={() => setEdition("java")}
              type="button"
            >
              Java Edition
            </button>
            <button
              className={edition === "bedrock" ? "secondary-button is-selected-button" : "secondary-button"}
              onClick={() => setEdition("bedrock")}
              type="button"
            >
              Bedrock Edition
            </button>
          </div>
          <input
            className="texture-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={edition === "java" ? "sound key / subtitle / path で検索" : "bedrock sound key / subtitle / path で検索"}
            type="search"
            value={query}
          />
          {edition === "java" ? (
            <div className="sound-select-row">
              <label className="sound-select">
                <span>Java Source</span>
                <select onChange={(event) => setJavaSource(event.target.value)} value={javaSource}>
                  <option value="master">master</option>
                  <option value="music">music</option>
                  <option value="record">record</option>
                  <option value="weather">weather</option>
                  <option value="block">block</option>
                  <option value="hostile">hostile</option>
                  <option value="neutral">neutral</option>
                  <option value="player">player</option>
                  <option value="ambient">ambient</option>
                  <option value="voice">voice</option>
                </select>
              </label>
            </div>
          ) : null}
          <div className="texture-action-row">
            <button
              className="primary-button"
              onClick={() => {
                if (!selectedEntry) {
                  setStatusMessage("先にサウンドを選択してください");
                  return;
                }

                void handleCopy(selectedEntry.commandKey, `${selectedEntry.commandKey} をコピーしました`);
              }}
              type="button"
            >
              選択中のキーをコピー
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                if (!selectedEntry) {
                  setStatusMessage("先にサウンドを選択してください");
                  return;
                }

                void handleCopy(commandSample, "/playsound コマンドをコピーしました");
              }}
              type="button"
            >
              /playsound をコピー
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                if (!selectedEntry) {
                  setStatusMessage("先にサウンドを選択してください");
                  return;
                }

                if (selectedEntry.edition !== "java") {
                  setStatusMessage("Bedrock 側はブラウザ再生に未対応です");
                  return;
                }

                void playEntry(selectedEntry);
              }}
              type="button"
            >
              選択中を再生
            </button>
            <button className="secondary-button" onClick={handleStop} type="button">
              停止
            </button>
          </div>
        </div>
      </section>

      <section className="sound-stats-grid">
        <div className="spotlight-item">
          <span>Version</span>
          <strong>{edition === "java" ? minecraftSoundAssetVersion : bedrockVersionLabel}</strong>
        </div>
        <div className="spotlight-item">
          <span>Total</span>
          <strong>{loadingEntries ? "Loading..." : entries.length}</strong>
        </div>
        <div className="spotlight-item">
          <span>Filtered</span>
          <strong>{loadingEntries ? "Loading..." : filteredEntries.length}</strong>
        </div>
        <div className="spotlight-item">
          <span>Status</span>
          <strong>{statusMessage}</strong>
        </div>
      </section>

      <section className="panel sound-preview-panel">
        <div className="sound-preview-header">
          <div>
            <p className="panel-label">Preview</p>
            <h2>{selectedEntry ? selectedEntry.commandKey : "サウンドを選択してください"}</h2>
          </div>
          <div className="sound-badge-row">
            <span className="sound-chip">{selectedEntry?.category ?? "category"}</span>
            <span className={selectedEntry?.previewUrl ? "sound-chip" : "sound-chip is-muted"}>
              {selectedEntry?.previewUrl ? "preview ready" : "preview unavailable"}
            </span>
            {selectedEntry?.stream ? <span className="sound-chip">stream</span> : null}
          </div>
        </div>

        <div className="sound-detail-grid">
          <div className="sound-detail-card">
            <span>Edition</span>
            <strong>{selectedEntry?.edition === "bedrock" ? "Bedrock Edition" : "Java Edition"}</strong>
          </div>
          <div className="sound-detail-card">
            <span>Subtitle</span>
            <strong>{selectedEntry?.subtitle ?? selectedEntry?.subtitleKey ?? "なし"}</strong>
          </div>
          <div className="sound-detail-card">
            <span>Preview Path</span>
            <strong>{selectedEntry?.previewPath ?? "直接再生不可"}</strong>
          </div>
          <div className="sound-detail-card">
            <span>Variants</span>
            <strong>{selectedEntry ? selectedEntry.sampleCount : 0}</strong>
          </div>
          {selectedEntry?.edition === "java" ? (
            <div className="sound-detail-card">
              <span>Nested Event</span>
              <strong>{selectedEntry.hasNestedEvent ? "あり" : "なし"}</strong>
            </div>
          ) : (
            <div className="sound-detail-card">
              <span>Command Rule</span>
              <strong>Bedrock は source 指定なし</strong>
            </div>
          )}
        </div>

        <textarea className="texture-export-box" readOnly value={commandSample} />

        <div className="sound-slider-grid">
          <label className="sound-slider">
            <span>Volume {previewVolume}%</span>
            <input
              max="200"
              min="0"
              onChange={(event) => setPreviewVolume(Number(event.target.value))}
              type="range"
              value={previewVolume}
            />
          </label>
          <label className="sound-slider">
            <span>Pitch {previewPitch}%</span>
            <input
              max="200"
              min="50"
              onChange={(event) => setPreviewPitch(Number(event.target.value))}
              type="range"
              value={previewPitch}
            />
          </label>
        </div>

        {edition === "java" ? (
          <audio className="sound-preview-audio" controls ref={audioRef} />
        ) : (
          <div className="sound-bedrock-note">
            <p className="section-text">
              Bedrock 側は Mojang の <strong>sound_definitions.json</strong> を参照してイベント名を出しています。現状の公式公開元には
              直接再生用の音声ファイル一式がないため、ここではコマンド確認を優先しています。
            </p>
          </div>
        )}
      </section>

      <section className="sound-grid">
        {loadingEntries ? (
          <div className="panel texture-empty-state">
            <p className="panel-label">Loading</p>
            <h2>サウンドデータを読み込んでいます</h2>
            <p className="section-text">外部アセットの読み込みが終わるまで少しだけ待ってください。</p>
          </div>
        ) : null}
        {filteredEntries.map((entry) => {
          const isSelected = selectedEntry?.edition === entry.edition && selectedEntry?.key === entry.key;
          return (
            <button
              className={isSelected ? "sound-card is-selected" : "sound-card"}
              key={`${entry.edition}:${entry.key}`}
              onClick={() => handleSelect(entry)}
              type="button"
            >
              <div className="sound-card-body">
                <div className="sound-card-header">
                  <h3>{entry.key}</h3>
                  <span className="sound-card-category">{entry.category}</span>
                </div>
                <p>{entry.subtitle ?? entry.subtitleKey ?? "subtitle なし"}</p>
                <code className="texture-asset-code">{entry.previewPath ?? "preview unavailable"}</code>
                <div className="sound-card-meta">
                  <span>{entry.sampleCount} variants</span>
                  <span>{entry.edition === "java" ? (entry.previewUrl ? "preview ok" : "event only") : "bedrock key"}</span>
                </div>
              </div>
            </button>
          );
        })}
      </section>
    </section>
  );
}
