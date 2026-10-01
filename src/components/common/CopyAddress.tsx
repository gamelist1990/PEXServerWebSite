import { useEffect, useState } from "react";
export function CopyAddress({ address }: { address: string }) {
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(""), 2500);
    return () => window.clearTimeout(timer);
  }, [feedback]);
  return (
    <div className="address-control">
      <button
        type="button"
        className="address-copy"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(address);
            setFeedback("コピーしました");
          } catch {
            setFeedback(
              "コピーできません。アドレスを選択してコピーしてください。",
            );
          }
        }}
        aria-label={`${address} をコピー`}
      >
        <code>{address}</code>
        <span aria-hidden="true">↗</span>
      </button>
      <span className="copy-feedback" role="status">
        {feedback || "クリックしてアドレスをコピー"}
      </span>
    </div>
  );
}
