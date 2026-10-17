"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

/** Copies `text` to the clipboard and briefly confirms it. */
export function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the email is still visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface/60 px-5 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-surface sm:text-base"
    >
      {copied ? <CheckIcon className="text-accent" /> : <CopyIcon />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
