"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCaption } from "@/hooks/useCaption";
import { downloadText, PLATFORM_CONFIG } from "@/lib/utils";
import { Platform } from "@/types";
import { toast } from "sonner";
import ImageUploader from "@/components/sections/ImageUploader";
import ToneSelector from "@/components/sections/ToneSelector";
import CaptionCard from "@/components/sections/CaptionCard";

export default function GenerateClient() {
  const { data: session, status } = useSession();
  const { imageUrl, imageFile, uploading, generating, captions, tone, setTone, uploadImage, generate, reset } = useCaption();
  const [usage, setUsage] = useState<{ usage: number; limit: number; remaining: number; plan: string } | null>(null);

  useEffect(() => {
    if (session) fetch("/api/usage").then(r => r.json()).then(setUsage).catch(() => {});
  }, [session, captions]);

  const downloadAll = () => {
    if (!captions) return;
    const text = Object.entries(captions).map(([p, c]) => `=== ${PLATFORM_CONFIG[p as Platform]?.label || p} ===\n\n${c}\n\n`).join("\n");
    downloadText(text, "captions-captionai.txt");
    toast.success("All captions downloaded!");
  };

  const limitReached = usage?.plan === "free" && (usage?.remaining ?? 1) <= 0;
  const canGenerate = !!session && !!imageUrl && !generating && !uploading && !limitReached;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Ambient */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "15%", left: "5%", width: "35vw", height: "35vw", maxWidth: 480, maxHeight: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "30vw", height: "30vw", maxWidth: 400, maxHeight: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, padding: "clamp(24px,5vw,48px) 20px" }}>
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,52px)" }}>
          <span className="badge" style={{ marginBottom: 18 }}>✨ AI Caption Generator</span>
          <h1 style={{ fontSize: "clamp(28px,6vw,56px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Generate <span className="grad-text">viral captions</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,3.5vw,17px)", color: "var(--c-muted)", maxWidth: 480, margin: "0 auto 20px" }}>
            Upload an image, pick a tone, and get captions in seconds.
          </p>

          {/* Usage pill */}
          {session && usage && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 18px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid var(--c-border)", fontSize: 13 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: limitReached ? "#f87171" : usage.remaining <= 3 ? "#fbbf24" : "#34d399", flexShrink: 0 }} />
              {usage.plan === "free"
                ? <span style={{ color: "var(--c-muted)" }}><strong style={{ color: "#fff" }}>{usage.remaining}</strong> of {usage.limit} generations left today</span>
                : <span style={{ color: "var(--c-muted)" }}>Unlimited · <span style={{ color: "#a5b4fc", fontWeight: 700 }}>{usage.plan}</span></span>}
            </div>
          )}

          {!session && status !== "loading" && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 18px", borderRadius: 999, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)" }}>
              <span style={{ fontSize: 14, color: "var(--c-muted)" }}>🔒 Sign in free · 15 generations/day</span>
              <Link href="/login" style={{ fontSize: 14, color: "#a5b4fc", fontWeight: 700 }}>Sign in →</Link>
            </div>
          )}
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: "clamp(16px,3vw,28px)", alignItems: "start" }}>

          {/* ── Left column ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Upload */}
            <div style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(18px,4vw,26px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(99,102,241,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#a5b4fc", flexShrink: 0 }}>1</span>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Upload Image</h2>
              </div>
              <ImageUploader onUpload={uploadImage} imageUrl={imageUrl} imageFile={imageFile} uploading={uploading} onReset={reset} />
            </div>

            {/* Tone */}
            <div style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(18px,4vw,26px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(139,92,246,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#c084fc", flexShrink: 0 }}>2</span>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Choose Tone</h2>
              </div>
              <ToneSelector value={tone} onChange={setTone} />
            </div>

            {/* Generate / auth button */}
            {session ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={generate} disabled={!canGenerate}
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "clamp(15px,3.5vw,17px)", padding: "clamp(14px,3vw,18px) 24px", background: limitReached ? "rgba(255,255,255,0.06)" : undefined, color: limitReached ? "var(--c-muted)" : undefined, boxShadow: limitReached ? "none" : undefined, opacity: (!imageUrl || uploading) && !limitReached ? 0.45 : 1 }}>
                  {generating
                    ? <><span className="spin" style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} /> Generating…</>
                    : limitReached ? "🔒 Daily limit reached"
                    : "🪄 Generate Captions  ⚡"}
                </button>
                {limitReached && (
                  <Link href="/pricing" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", borderColor: "rgba(99,102,241,0.35)", color: "#a5b4fc" }}>
                    ✨ Upgrade for Unlimited
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "clamp(15px,3.5vw,17px)", padding: "clamp(14px,3vw,18px) 24px" }}>
                🔑 Sign in to Generate
              </Link>
            )}

            {!imageUrl && status === "authenticated" && (
              <p style={{ textAlign: "center", fontSize: 12, color: "var(--c-dim)" }}>Upload an image to get started</p>
            )}
          </motion.div>

          {/* ── Right column ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <AnimatePresence mode="wait">
              {generating ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(48px,8vw,80px) 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, minHeight: 420, textAlign: "center" }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 76, height: 76, borderRadius: 22, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }} className="float-anim">✨</div>
                    <div style={{ position: "absolute", inset: -10, borderRadius: 32, border: "1px solid rgba(99,102,241,0.25)" }} className="pulse-anim" />
                  </div>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>AI is crafting your captions…</p>
                    <p style={{ fontSize: 14, color: "var(--c-muted)" }}>Analyzing image & generating viral content</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 260 }}>
                    {["🔍 Analyzing image content…", "✍️ Writing platform captions…", "#️⃣ Generating viral hashtags…"].map((s, i) => (
                      <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="spin" style={{ width: 14, height: 14, border: "2px solid rgba(99,102,241,0.35)", borderTopColor: "#6366f1", borderRadius: "50%", display: "inline-block", flexShrink: 0, animationDelay: `${i * 0.25}s` }} />
                        <span style={{ fontSize: 13, color: "var(--c-muted)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              ) : captions ? (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399" }} className="pulse-anim" />
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>4 captions generated</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={generate} disabled={generating || limitReached}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                        🔄 Regenerate
                      </button>
                      <button onClick={downloadAll}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                        ⬇️ Download All
                      </button>
                    </div>
                  </div>
                  {(["instagram","youtube","linkedin","hashtags"] as Platform[]).map((p, i) => (
                    <CaptionCard key={p} platform={p} content={captions[p]} index={i} />
                  ))}
                </motion.div>

              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ borderRadius: 20, border: "2px dashed var(--c-border)", background: "rgba(255,255,255,0.01)", padding: "clamp(48px,8vw,80px) 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, minHeight: 420, textAlign: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>✨</div>
                  <div>
                    <p style={{ fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.32)", marginBottom: 8 }}>Your captions will appear here</p>
                    <p style={{ fontSize: 13, color: "var(--c-dim)" }}>Upload an image and hit Generate</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 280 }}>
                    {["📸 Instagram","🎬 YouTube","💼 LinkedIn","#️⃣ Hashtags"].map(p => (
                      <div key={p} style={{ borderRadius: 13, background: "rgba(255,255,255,0.03)", border: "1px solid var(--c-border)", padding: "11px 14px", fontSize: 13, color: "var(--c-dim)", textAlign: "center" }}>{p}</div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
