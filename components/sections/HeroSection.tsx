"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PLATFORMS = [
  { icon: "📸", label: "Instagram" },
  { icon: "🎬", label: "YouTube" },
  { icon: "💼", label: "LinkedIn" },
  { icon: "#️⃣", label: "Hashtags" },
];

export default function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "100px 0 80px" }}>
      {/* Ambient blobs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", bottom: "-5%", right: "-5%", width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.14) 0%,transparent 70%)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "70vw", maxWidth: 900, maxHeight: 900, borderRadius: "50%", background: "radial-gradient(circle,rgba(67,56,202,0.07) 0%,transparent 60%)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: 32, fontSize: "clamp(12px,3.2vw,14px)" }}>
              ✨ AI-Powered Caption Generator
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(40px,8.5vw,96px)", fontWeight: 900, lineHeight: 1.03, letterSpacing: "-0.035em", marginBottom: 28 }}>
            <span style={{ color: "var(--c-text)" }}>Generate</span>{" "}
            <span className="grad-text">Viral Captions</span>
            <br />
            <span style={{ color: "var(--c-text)" }}>in Seconds</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: "clamp(16px,3.8vw,21px)", color: "var(--c-muted)", maxWidth: 580, margin: "0 auto 44px", lineHeight: 1.65 }}>
            Upload any image and instantly get platform-optimized captions for{" "}
            <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>Instagram, YouTube & LinkedIn</strong>{" "}
            powered by <span style={{ color: "#a5b4fc", fontWeight: 700 }}>Groq AI</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 56 }}>
            <Link href="/generate" className="btn btn-primary btn-xl">⚡ Start Generating Free →</Link>
            <Link href="/pricing" className="btn btn-ghost btn-xl">View Pricing</Link>
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 28px", color: "var(--c-dim)", fontSize: "clamp(13px,3vw,14px)", marginBottom: 72 }}>
            <span>⭐⭐⭐⭐⭐ <strong style={{ color: "rgba(255,255,255,0.7)" }}>4.9/5</strong></span>
            <span style={{ color: "var(--c-border2)" }}>•</span>
            <span><strong style={{ color: "rgba(255,255,255,0.7)" }}>10,000+</strong> creators</span>
            <span style={{ color: "var(--c-border2)" }}>•</span>
            <span><strong style={{ color: "rgba(255,255,255,0.7)" }}>500K+</strong> captions</span>
          </motion.div>

          {/* App preview mockup */}
          <motion.div initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
            style={{ borderRadius: "clamp(20px,4vw,32px)", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)", padding: "clamp(20px,4vw,32px)", backdropFilter: "blur(12px)", boxShadow: "0 0 80px rgba(99,102,241,0.1), 0 40px 80px rgba(0,0,0,0.4)" }}>
            {/* Mock toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              <div style={{ flex: 1, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.05)", marginLeft: 8 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "clamp(12px,3vw,20px)" }}>
              {/* Upload zone */}
              <div style={{ borderRadius: 18, border: "2px dashed rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.04)", padding: "clamp(28px,6vw,52px) 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🖼️</div>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>Drop your image here</p>
                <div style={{ padding: "9px 22px", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: 13, fontWeight: 600 }}>Upload Image</div>
              </div>
              {/* Caption previews */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PLATFORMS.map((p, i) => (
                  <div key={p.label} style={{ borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "12px 14px" }}>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{p.icon} {p.label}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {[...Array(i === 1 ? 3 : 2)].map((_, j) => (
                        <div key={j} style={{ height: 7, borderRadius: 4, background: "rgba(255,255,255,0.08)", width: `${62 + (i + j) * 9}%` }} className="shimmer-anim" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
