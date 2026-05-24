"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{ position: "relative", borderRadius: "clamp(24px,5vw,40px)", border: "1px solid rgba(99,102,241,0.3)", overflow: "hidden", padding: "clamp(48px,8vw,100px) clamp(24px,6vw,80px)", textAlign: "center" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(99,102,241,0.12) 0%,rgba(139,92,246,0.08) 50%,rgba(67,56,202,0.12) 100%)", pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "200%", background: "radial-gradient(ellipse,rgba(99,102,241,0.15) 0%,transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "clamp(48px,8vw,80px)", marginBottom: 24 }}>✨</div>
            <h2 style={{ fontSize: "clamp(28px,6vw,56px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20 }}>Ready to go viral?</h2>
            <p style={{ fontSize: "clamp(15px,3.5vw,19px)", color: "var(--c-muted)", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.65 }}>
              Join 10,000+ creators who use CaptionAI to craft captions that stop the scroll and drive real engagement.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <Link href="/generate" className="btn btn-primary btn-xl">⚡ Generate Free Now →</Link>
              <Link href="/pricing" className="btn btn-ghost btn-xl">View Pricing</Link>
            </div>
            <p style={{ marginTop: 24, fontSize: 13, color: "var(--c-dim)" }}>No credit card required • 15 free generations daily</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
