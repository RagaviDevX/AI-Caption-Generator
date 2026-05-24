"use client";
import { motion } from "framer-motion";

const FEATURES = [
  { icon: "⚡", title: "Lightning Fast", desc: "Captions generated in under 3 seconds with Groq's ultra-fast LLM inference engine.", grad: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.2)" },
  { icon: "🖼️", title: "Drag & Drop Upload", desc: "Drop your image or click to browse. Supports JPEG, PNG, WebP, GIF up to 10MB.", grad: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.2)" },
  { icon: "📱", title: "4 Platforms at Once", desc: "Instagram, YouTube, LinkedIn captions and viral hashtags — all in one generation.", grad: "rgba(244,114,182,0.15)", border: "rgba(244,114,182,0.2)" },
  { icon: "#️⃣", title: "Viral Hashtags", desc: "30 trending, niche-specific hashtags proven to boost reach and discoverability.", grad: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.2)" },
  { icon: "📋", title: "One-Click Copy", desc: "Copy any caption to clipboard instantly. Ready to paste directly into your app.", grad: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.2)" },
  { icon: "⬇️", title: "Download All", desc: "Export all four captions as a single text file for offline use or team sharing.", grad: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.2)" },
  { icon: "🎭", title: "6 Tone Styles", desc: "Viral, Funny, Luxury, Emotional, Professional, or Inspirational — your choice.", grad: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.2)" },
  { icon: "📊", title: "Usage Dashboard", desc: "Track all your generations, see history, and monitor daily usage in one place.", grad: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.2)" },
  { icon: "🔒", title: "Secure & Private", desc: "All API calls are server-side. Your images and keys are never exposed to the client.", grad: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.2)" },
];

export default function FeaturesSection() {
  return (
    <section className="section" style={{ position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div className="container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "clamp(40px,7vw,72px)" }}>
          <span className="badge" style={{ marginBottom: 20 }}>🚀 Everything you need</span>
          <h2 style={{ fontSize: "clamp(28px,5.5vw,52px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 18 }}>
            Built for <span className="grad-text">creators</span>
          </h2>
          <p style={{ fontSize: "clamp(15px,3.5vw,18px)", color: "var(--c-muted)", maxWidth: 520, margin: "0 auto" }}>
            Every feature you need to create compelling social media content at scale.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(14px,2.5vw,22px)" }}>
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div style={{ height: "100%", borderRadius: 20, border: `1px solid ${f.border}`, background: f.grad, padding: "clamp(20px,4vw,28px)", display: "flex", flexDirection: "column", gap: 14, transition: "all 0.25s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ fontSize: 32, lineHeight: 1 }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--c-muted)", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
