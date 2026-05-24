"use client";
import { CaptionTone } from "@/types";

const TONES: { v: CaptionTone; e: string; l: string; d: string }[] = [
  { v: "viral",         e: "🔥", l: "Viral",         d: "Max shares" },
  { v: "funny",         e: "😂", l: "Funny",         d: "Witty & fun" },
  { v: "luxury",        e: "✨", l: "Luxury",        d: "Premium" },
  { v: "emotional",     e: "💫", l: "Emotional",     d: "Heartfelt" },
  { v: "professional",  e: "💼", l: "Professional",  d: "Business" },
  { v: "inspirational", e: "🚀", l: "Inspirational", d: "Motivate" },
];

export default function ToneSelector({ value, onChange }: { value: CaptionTone; onChange: (t: CaptionTone) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
      {TONES.map(t => (
        <button key={t.v} onClick={() => onChange(t.v)}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5, padding: "11px 12px", borderRadius: 14, border: `1px solid ${value === t.v ? "rgba(99,102,241,0.55)" : "var(--c-border)"}`, background: value === t.v ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.15s", textAlign: "left" }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{t.e}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: value === t.v ? "#a5b4fc" : "rgba(255,255,255,0.72)", lineHeight: 1 }}>{t.l}</span>
          <span style={{ fontSize: 10, color: "var(--c-dim)", lineHeight: 1 }}>{t.d}</span>
        </button>
      ))}
    </div>
  );
}
