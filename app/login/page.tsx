"use client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const go = async (provider: string) => { setLoading(provider); await signIn(provider, { callbackUrl: "/dashboard" }); };

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "20%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "10%", width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 65%)" }} />
      </div>

      <Link href="/" style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--c-muted)", textDecoration: "none", transition: "color 0.15s", zIndex: 10 }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-muted)"}>
        ← Back to home
      </Link>

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 18px", boxShadow: "0 0 32px rgba(99,102,241,0.45)" }}>✨</div>
          <h1 style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.025em", marginBottom: 8 }}>Welcome to CaptionAI</h1>
          <p style={{ fontSize: 15, color: "var(--c-muted)" }}>Sign in to generate viral captions & track usage</p>
        </div>

        {/* Card */}
        <div style={{ borderRadius: 24, border: "1px solid var(--c-border)", background: "rgba(13,13,20,0.8)", backdropFilter: "blur(20px)", padding: "clamp(24px,5vw,36px)", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Google */}
          <button onClick={() => go("google")} disabled={!!loading}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, height: 52, borderRadius: 14, border: "1px solid var(--c-border2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: !!loading ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: loading && loading !== "google" ? 0.5 : 1 }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}>
            {loading === "google"
              ? <span className="spin" style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} />
              : <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>}
            {loading === "google" ? "Signing in…" : "Continue with Google"}
          </button>

          {/* GitHub */}
          <button onClick={() => go("github")} disabled={!!loading}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, height: 52, borderRadius: 14, border: "1px solid var(--c-border2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: !!loading ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: loading && loading !== "github" ? 0.5 : 1 }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}>
            {loading === "github"
              ? <span className="spin" style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} />
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>}
            {loading === "github" ? "Signing in…" : "Continue with GitHub"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
            <span style={{ fontSize: 12, color: "var(--c-dim)", whiteSpace: "nowrap" }}>Secure OAuth 2.0</span>
            <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
          </div>

          {/* Benefits */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[["⚡","15 free AI generations per day — no credit card"],["📊","Track all your caption history & usage"],["🔒","Secure & private — we never share your data"]].map(([e, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{e}</span>
                <span style={{ fontSize: 13, color: "var(--c-muted)", lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--c-dim)", marginTop: 20 }}>
          By signing in you agree to our{" "}
          <Link href="#" style={{ color: "var(--c-muted)", textDecoration: "underline" }}>Terms</Link> &{" "}
          <Link href="#" style={{ color: "var(--c-muted)", textDecoration: "underline" }}>Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}
