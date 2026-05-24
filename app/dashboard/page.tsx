"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface Usage { usage: number; limit: number; remaining: number; plan: string; }
interface Gen { id: string; imageUrl: string; instagram: string; youtube: string; linkedin: string; hashtags: string; tone: string; createdAt: string; }

function UsageRing({ u, limit, plan }: { u: number; limit: number; plan: string }) {
  const unlimited = plan !== "free";
  const pct = unlimited ? 100 : Math.min(100, (u / limit) * 100);
  const r = 38; const c = 2 * Math.PI * r;
  const color = pct > 85 ? "#f87171" : pct > 60 ? "#fbbf24" : "#6366f1";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: 100, height: 100 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${(pct / 100) * c} ${c}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1.2s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{unlimited ? "∞" : u}</span>
          <span style={{ fontSize: 10, color: "var(--c-dim)", marginTop: 2 }}>used</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--c-muted)" }}>
          {unlimited ? "Unlimited generations" : `${limit - u} of ${limit} remaining`}
        </p>
        <span style={{ display: "inline-block", marginTop: 6, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", background: plan === "free" ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.2)", color: plan === "free" ? "var(--c-muted)" : "#a5b4fc" }}>
          {plan}
        </span>
      </div>
    </div>
  );
}

function StatCard({ emoji, label, value, delay }: { emoji: string; label: string; value: string | number; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      style={{ borderRadius: 18, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(16px,3.5vw,24px)" }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>{emoji}</div>
      <p style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 6 }}>{value}</p>
      <p style={{ fontSize: 13, color: "var(--c-muted)" }}>{label}</p>
    </motion.div>
  );
}

const PLATFORM_META = {
  instagram: { icon: "📸", label: "Instagram", color: "#f472b6" },
  youtube:   { icon: "🎬", label: "YouTube",   color: "#f87171" },
  linkedin:  { icon: "💼", label: "LinkedIn",  color: "#60a5fa" },
  hashtags:  { icon: "#️⃣", label: "Hashtags",  color: "#a78bfa" },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usage, setUsage] = useState<Usage | null>(null);
  const [gens, setGens] = useState<Gen[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => { if (status === "unauthenticated") router.push("/login"); }, [status, router]);

  useEffect(() => {
    if (!session) return;
    Promise.all([fetch("/api/usage").then(r => r.json()), fetch("/api/profile").then(r => r.json())])
      .then(([u, p]) => { setUsage(u); setGens(p.user?.generations || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  const doCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key); setTimeout(() => setCopied(null), 2000);
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }} className="pulse-anim">✨</div>
          <p style={{ fontSize: 14, color: "var(--c-muted)" }}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const today = new Date().toDateString();
  const todayCount = gens.filter(g => new Date(g.createdAt).toDateString() === today).length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)" }}>
      <Navbar />
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "-5%", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "35vw", height: "35vw", maxWidth: 440, maxHeight: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(84px,10vw,104px)", paddingBottom: "clamp(40px,6vw,80px)" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: "clamp(24px,5vw,40px)" }}>
          <div>
            <h1 style={{ fontSize: "clamp(22px,5vw,36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.025em", marginBottom: 6 }}>
              Welcome back, {session?.user?.name?.split(" ")[0]} 👋
            </h1>
            <p style={{ fontSize: "clamp(13px,3vw,15px)", color: "var(--c-muted)" }}>Here's your caption generation overview</p>
          </div>
          <Link href="/generate" className="btn btn-primary" style={{ flexShrink: 0 }}>+ New Generation</Link>
        </motion.div>

        {/* Upgrade banner */}
        {usage?.plan === "free" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{ marginBottom: "clamp(20px,4vw,32px)", borderRadius: 18, border: "1px solid rgba(99,102,241,0.3)", background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.07))", padding: "clamp(16px,3.5vw,22px) clamp(18px,4vw,28px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>👑</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 3 }}>Free Plan — {usage.remaining} generations left today</p>
                  <p style={{ fontSize: 13, color: "var(--c-muted)" }}>Upgrade to Pro for unlimited daily generations</p>
                </div>
              </div>
              <Link href="/pricing" className="btn btn-primary btn-sm" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>Upgrade to Pro →</Link>
            </div>
          </motion.div>
        )}

        {/* Stats grid + usage ring */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: "clamp(12px,2.5vw,20px)", marginBottom: "clamp(20px,4vw,32px)" }}>
          <StatCard emoji="✨" label="Total Generations" value={gens.length} delay={0.1} />
          <StatCard emoji="📅" label="Generated Today" value={todayCount} delay={0.15} />
          <StatCard emoji="📊" label="Daily Limit" value={usage?.plan === "free" ? `${usage.limit}/day` : "∞"} delay={0.2} />
          {/* Usage ring card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
            style={{ borderRadius: 18, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(16px,3.5vw,24px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--c-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Daily Usage</p>
            {usage && <UsageRing u={usage.usage} limit={usage.limit} plan={usage.plan} />}
          </motion.div>
        </div>

        {/* Main content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: "clamp(14px,3vw,24px)" }}>

          {/* Recent generations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(16px,3.5vw,22px) clamp(18px,4vw,24px)", borderBottom: "1px solid var(--c-border)" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>🕐 Recent Generations</h2>
              <Link href="/generate" style={{ fontSize: 13, color: "#a5b4fc", display: "flex", alignItems: "center", gap: 4 }}>+ New</Link>
            </div>

            {gens.length === 0 ? (
              <div style={{ padding: "clamp(40px,8vw,72px) 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🖼️</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>No generations yet</p>
                  <p style={{ fontSize: 13, color: "var(--c-dim)" }}>Upload an image to create your first captions</p>
                </div>
                <Link href="/generate" className="btn btn-primary btn-sm">⚡ Start Generating</Link>
              </div>
            ) : (
              <div style={{ maxHeight: 520, overflowY: "auto" }}>
                {gens.slice(0, 10).map((gen, i) => (
                  <motion.div key={gen.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
                    style={{ padding: "clamp(14px,3vw,18px) clamp(18px,4vw,24px)", borderBottom: i < gens.length - 1 ? "1px solid var(--c-border)" : "none", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      {/* Thumbnail */}
                      <div style={{ width: 52, height: 52, borderRadius: 13, overflow: "hidden", border: "1px solid var(--c-border)", background: "rgba(255,255,255,0.04)", flexShrink: 0 }}>
                        <img src={gen.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.78)", textTransform: "capitalize" as const }}>{gen.tone} tone</span>
                          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.07)", color: "var(--c-dim)" }}>
                            {new Date(gen.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: "var(--c-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 10 }}>
                          {gen.instagram}
                        </p>
                        {/* Copy buttons */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {(["instagram","youtube","linkedin","hashtags"] as const).map(p => {
                            const m = PLATFORM_META[p]; const k = `${gen.id}-${p}`;
                            return (
                              <button key={p} onClick={() => doCopy(gen[p], k)}
                                style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.18s", border: `1px solid ${copied === k ? "rgba(52,211,153,0.35)" : "var(--c-border)"}`, background: copied === k ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)", color: copied === k ? "#34d399" : "var(--c-muted)" }}>
                                <span>{copied === k ? "✅" : m.icon}</span>
                                <span className="hide-xs">{copied === k ? "Copied" : m.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,3vw,20px)" }}>
            {/* Quick generate */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(18px,4vw,26px)" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>⚡ Quick Generate</h2>
              <Link href="/generate"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "clamp(24px,5vw,36px) 20px", borderRadius: 16, border: "2px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.015)", textDecoration: "none", transition: "all 0.2s", marginBottom: 14 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>+</div>
                <p style={{ fontSize: 13, color: "var(--c-muted)", textAlign: "center" }}>Upload image to generate captions</p>
              </Link>
              <Link href="/generate" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>⚡ Generate Now</Link>
            </motion.div>

            {/* Platform breakdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(18px,4vw,26px)" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>📈 Platforms</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {Object.entries(PLATFORM_META).map(([p, m]) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{m.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.68)" }}>{m.label}</span>
                        <span style={{ fontSize: 12, color: "var(--c-dim)" }}>{gens.length}</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 3, background: m.color, width: gens.length > 0 ? "100%" : "0%", transition: "width 1.2s ease", opacity: 0.7 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile quick link */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              style={{ borderRadius: 20, border: "1px solid var(--c-border)", background: "var(--c-card)", padding: "clamp(18px,4vw,26px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {session?.user?.image
                  ? <img src={session.user.image} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(99,102,241,0.35)", flexShrink: 0 }} />
                  : <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{session?.user?.name?.[0]?.toUpperCase()}</div>}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session?.user?.name}</p>
                  <p style={{ fontSize: 12, color: "var(--c-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session?.user?.email}</p>
                </div>
                <Link href="/profile" style={{ padding: "7px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid var(--c-border)", fontSize: 12, color: "var(--c-muted)", fontWeight: 600, flexShrink: 0, transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--c-muted)"; }}>
                  ⚙️ Settings
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style>{`.hide-xs span:last-child { display: inline; } @media(max-width:400px){.hide-xs span:last-child{display:none}}`}</style>
    </div>
  );
}
