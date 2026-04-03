import { useEffect, useRef, useState } from "react";
import type { MinecraftLanguageMap, MinecraftSoundDefinition, MinecraftSoundEntry } from "../app/types";
import { minecraftSoundAssetVersion, minecraftSoundDataUrl, minecraftSoundLanguageUrl } from "../data/generated/minecraftSoundMeta";
import { buildMinecraftSoundEntries } from "../features/minecraft-sounds/normalize";

export function MinecraftSoundPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [entries, setEntries] = useState<MinecraftSoundEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<MinecraftSoundEntry | null>(null);
  const [statusMessage, setStatusMessage] = useState("待機中");
  const [previewVolume, setPreviewVolume] = useState(100);
  const [previewPitch, setPreviewPitch] = useState(100);

  const previewAudioVolume = Math.min(Math.max(previewVolume / 100, 0), 1);
  const previewAudioPitch = Math.min(Math.max(previewPitch / 100, 0.5), 2);

  useEffect(() => {
    let mounted = true;

    const loadEntries = async () => {
      try {
        const [soundResponse, languageResponse] = await Promise.all([
          fetch(minecraftSoundDataUrl, { cache: "no-store" }),
          fetch(minecraftSoundLanguageUrl, { cache: "no-store" })
        ]);

        if (!soundResponse.ok || !languageResponse.ok) {
          throw new Error(`HTTP ${soundResponse.status} / ${languageResponse.status}`);
        }

        const definitions = (await soundResponse.json()) as Record<string, MinecraftSoundDefinition>;
        const languageMap = (await languageResponse.json()) as MinecraftLanguageMap;
        const normalizedEntries = buildMinecraftSoundEntries(definitions, languageMap);

        if (!mounted) {
          return;
        }

        setEntries(normalizedEntries);
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
    void playEntry(entry);
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
    ? `/playsound ${selectedEntry.namespacedKey} master @s ~ ~ ~ ${(previewVolume / 100).toFixed(2)} ${(previewPitch / 100).toFixed(2)}`
    : "";

  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Tools / Minecraft Sound Explorer</p>
        <h2>Minecraft Sound Explorer</h2>
        <p className="section-text">
          vanilla の <strong>sounds.json</strong> をもとにしたサウンド一覧です。検索しながらその場で再生し、<strong>minecraft:...</strong> や
          <strong> /playsound</strong> の形でコピーできます。
        </p>
      </section>

      <section className="panel sound-control-panel">
        <div className="sound-toolbar">
          <input
            className="texture-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="sound key / subtitle / path で検索"
            type="search"
            value={query}
          />
          <div className="texture-action-row">
            <button
              className="primary-button"
              onClick={() => {
                if (!selectedEntry) {
                  setStatusMessage("先にサウンドを選択してください");
                  return;
                }

                void handleCopy(selectedEntry.namespacedKey, `${selectedEntry.namespacedKey} をコピーしました`);
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
          <strong>{minecraftSoundAssetVersion}</strong>
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
            <h2>{selectedEntry ? selectedEntry.namespacedKey : "サウンドを選択してください"}</h2>
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
          <div className="sound-detail-card">
            <span>Nested Event</span>
            <strong>{selectedEntry?.hasNestedEvent ? "あり" : "なし"}</strong>
          </div>
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

        <audio className="sound-preview-audio" controls ref={audioRef} />
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
          const isSelected = selectedEntry?.namespacedKey === entry.namespacedKey;
          return (
            <button
              className={isSelected ? "sound-card is-selected" : "sound-card"}
              key={entry.namespacedKey}
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
                  <span>{entry.previewUrl ? "preview ok" : "event only"}</span>
                </div>
              </div>
            </button>
          );
        })}
      </section>
    </section>
  );
}
