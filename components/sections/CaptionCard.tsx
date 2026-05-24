"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { copyToClipboard, downloadText, PLATFORM_CONFIG } from "@/lib/utils";
import { Platform } from "@/types";
import { toast } from "sonner";

const COLORS: Record<Platform, { accent: string; bg: string; border: string }> = {
  instagram: { accent: "#f472b6", bg: "rgba(244,114,182,0.07)", border: "rgba(244,114,182,0.22)" },
  youtube:   { accent: "#f87171", bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.22)" },
  linkedin:  { accent: "#60a5fa", bg: "rgba(96,165,250,0.07)",  border: "rgba(96,165,250,0.22)"  },
  hashtags:  { accent: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.22)" },
};

export default function CaptionCard({ platform, content, index }: { platform: Platform; content: string; index: number }) {
  const [copied, setCopied] = useState(false);
  const cfg = PLATFORM_CONFIG[platform];
  const col = COLORS[platform];

  const doCopy = async () => {
    try { await copyToClipboard(content); setCopied(true); toast.success(`${cfg.label} caption copied!`); setTimeout(() => setCopied(false), 2200); }
    catch { toast.error("Copy failed"); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}
      style={{ borderRadius: 18, border: `1px solid ${col.border}`, background: col.bg, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{cfg.icon}</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: col.accent, marginBottom: 2 }}>{cfg.label}</p>
            <p style={{ fontSize: 11, color: "var(--c-dim)" }}>{content.length} chars</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { downloadText(content, `${platform}-caption.txt`); toast.success("Downloaded!"); }}
            style={{ padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>⬇️</button>
          <button onClick={doCopy}
            style={{ padding: "7px 16px", borderRadius: 9, background: copied ? "rgba(52,211,153,0.14)" : "rgba(255,255,255,0.07)", border: `1px solid ${copied ? "rgba(52,211,153,0.35)" : "var(--c-border)"}`, color: copied ? "#34d399" : "rgba(255,255,255,0.75)", fontSize: 12, cursor: "pointer", fontWeight: 600, transition: "all 0.2s", whiteSpace: "nowrap" }}>
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>
      <div style={{ padding: "16px 18px" }}>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.76)", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{content}</p>
      </div>
    </motion.div>
  );
}
