"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";

interface Profile { id: string; name: string; email: string; image: string; plan: string; dailyUsage: number; createdAt: string; payments: { id: string; plan: string; amount: number; status: string; createdAt: string }[]; }

function Section({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", overflow: "hidden" }}>
      <div style={{ padding: "clamp(16px,3.5vw,22px) clamp(18px,4vw,26px)", borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{title}</h2>
      </div>
      <div style={{ padding: "clamp(18px,4vw,26px)" }}>{children}</div>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 42, height: 24, borderRadius: 12, background: on ? "var(--c-indigo)" : "rgba(255,255,255,0.12)", position: "relative", flexShrink: 0, cursor: "pointer", transition: "background 0.2s" }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (status === "unauthenticated") router.push("/login"); }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/profile").then(r => r.json()).then(d => { setProfile(d.user); setName(d.user?.name || ""); setLoading(false); });
  }, [session]);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
      const d = await res.json();
      if (d.user) { setProfile(d.user); await update({ name }); toast.success("Profile updated!"); }
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(99,102,241,0.3)", borderTopColor: "#6366f1" }} className="spin" />
      </div>
    );
  }

  const since = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "—";

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)" }}>
      <Navbar />
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: 0, width: "35vw", height: "35vw", maxWidth: 450, maxHeight: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(84px,10vw,104px)", paddingBottom: "clamp(40px,6vw,80px)" }}>
        {/* Back + title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "clamp(24px,5vw,36px)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, color: "var(--c-muted)", marginBottom: 18, transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-muted)"}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ fontSize: "clamp(22px,5vw,36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.025em", marginBottom: 6 }}>Profile Settings</h1>
          <p style={{ fontSize: 15, color: "var(--c-muted)" }}>Manage your account and subscription</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(14px,3vw,24px)", alignItems: "start" }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,3vw,20px)" }}>
            {/* Avatar card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(24px,5vw,36px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
              <div style={{ position: "relative", marginBottom: 4 }}>
                {profile?.image
                  ? <img src={profile.image} alt="" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(99,102,241,0.4)" }} />
                  : <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: "#fff" }}>{profile?.name?.[0]?.toUpperCase()}</div>}
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", border: "2px solid var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, background: profile?.plan === "free" ? "rgba(255,255,255,0.15)" : "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  {profile?.plan === "free" ? "👤" : "👑"}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{profile?.name}</p>
                <p style={{ fontSize: 13, color: "var(--c-muted)", wordBreak: "break-all" }}>{profile?.email}</p>
              </div>
              <span style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", background: profile?.plan === "free" ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.2)", color: profile?.plan === "free" ? "var(--c-muted)" : "#a5b4fc" }}>
                {profile?.plan || "free"} plan
              </span>
              <p style={{ fontSize: 12, color: "var(--c-dim)" }}>Member since {since}</p>
            </motion.div>

            {/* Subscription card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Section title="Subscription" emoji="💎">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { l: "Current Plan", v: (profile?.plan || "free").toUpperCase() },
                    { l: "Daily Limit", v: profile?.plan === "free" ? "15 / day" : "Unlimited" },
                    { l: "Used Today", v: `${profile?.dailyUsage || 0}` },
                  ].map(row => (
                    <div key={row.l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--c-border)" }}>
                      <span style={{ fontSize: 13, color: "var(--c-muted)" }}>{row.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{row.v}</span>
                    </div>
                  ))}
                </div>
                {profile?.plan === "free" && (
                  <Link href="/pricing" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}>
                    👑 Upgrade to Pro
                  </Link>
                )}
              </Section>
            </motion.div>

            {/* Danger zone */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              style={{ borderRadius: 20, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.05)", padding: "clamp(18px,4vw,24px)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f87171", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>⚠️ Account Actions</h3>
              <button onClick={() => signOut({ callbackUrl: "/" })}
                style={{ width: "100%", padding: "13px", borderRadius: 13, border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#f87171", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.1)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                🚪 Sign Out
              </button>
            </motion.div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,3vw,20px)" }}>
            {/* Edit profile */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Section title="Personal Information" emoji="👤">
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--c-muted)", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Full Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="input" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--c-muted)", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Email Address</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--c-border)", padding: "0 14px" }}>
                      <span style={{ fontSize: 15 }}>📧</span>
                      <span style={{ fontSize: 14, color: "var(--c-dim)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profile?.email}</span>
                      <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "rgba(52,211,153,0.15)", color: "#34d399", fontWeight: 600, flexShrink: 0 }}>✓ Verified</span>
                    </div>
                    <p style={{ fontSize: 11, color: "var(--c-dim)", marginTop: 6 }}>Managed by your OAuth provider (Google/GitHub)</p>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--c-muted)", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Login Method</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--c-border)", padding: "0 14px" }}>
                      <span style={{ fontSize: 15 }}>🔐</span>
                      <span style={{ fontSize: 14, color: "var(--c-dim)" }}>OAuth 2.0 (Google / GitHub)</span>
                    </div>
                  </div>
                  <button onClick={save} disabled={saving}
                    className="btn btn-primary"
                    style={{ alignSelf: "flex-start", opacity: saving ? 0.7 : 1 }}>
                    {saving ? <><span className="spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} /> Saving…</> : "💾 Save Changes"}
                  </button>
                </div>
              </Section>
            </motion.div>

            {/* Payment history */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Section title="Payment History" emoji="💳">
                {(!profile?.payments || profile.payments.length === 0) ? (
                  <div style={{ textAlign: "center", padding: "clamp(24px,5vw,40px) 0" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 14px" }}>💳</div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>No payments yet</p>
                    <p style={{ fontSize: 12, color: "var(--c-dim)", marginBottom: 18 }}>Your payment history will appear here</p>
                    <Link href="/pricing" className="btn btn-ghost btn-sm" style={{ display: "inline-flex" }}>View Plans</Link>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {profile.payments.map(pay => (
                      <div key={pay.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid var(--c-border)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: pay.status === "success" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)", flexShrink: 0 }}>
                            {pay.status === "success" ? "✅" : "⏳"}
                          </div>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "capitalize" as const }}>{pay.plan} Plan</p>
                            <p style={{ fontSize: 11, color: "var(--c-dim)" }}>{new Date(pay.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>₹{(pay.amount / 100).toLocaleString("en-IN")}</p>
                          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: pay.status === "success" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)", color: pay.status === "success" ? "#34d399" : "#fbbf24", fontWeight: 600 }}>
                            {pay.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Notifications" emoji="🔔">
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { l: "Daily usage reminders", d: "Get notified when you're close to your limit", on: true },
                    { l: "New features & updates", d: "Stay updated with new CaptionAI features", on: true },
                    { l: "Marketing emails", d: "Tips, tutorials and creator insights", on: false },
                  ].map(n => (
                    <div key={n.l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--c-border)" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.82)", marginBottom: 3 }}>{n.l}</p>
                        <p style={{ fontSize: 12, color: "var(--c-dim)" }}>{n.d}</p>
                      </div>
                      <Toggle on={n.on} />
                    </div>
                  ))}
                </div>
              </Section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
