"use client";

export function PrintButton({ label = "印刷" }: { label?: string }) {
  return (
    <button
      type="button"
      className="print-button"
      onClick={() => window.print()}
      aria-label={`${label}ダイアログを開く`}
    >
      {label}
    </button>
  );
}
