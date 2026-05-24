"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PLANS = [
  {
    id: "free", name: "Free", emoji: "🆓", price: "₹0", period: "forever",
    desc: "Perfect to get started", highlight: false,
    features: ["15 generations / day","All 4 platforms","Viral hashtags","Copy to clipboard","All 6 tone styles","Caption history"],
    cta: "Get Started", href: "/generate",
  },
  {
    id: "pro", name: "Pro", emoji: "👑", price: "₹1,990", period: "/month",
    desc: "For serious content creators", highlight: true, badge: "Most Popular",
    features: ["Unlimited generations","All 4 platforms","Viral hashtags","Download all captions","All 6 tone styles","Priority AI processing","Full caption history","API access","Priority support"],
    cta: "Upgrade to Pro", href: "/login",
  },
  {
    id: "agency", name: "Agency", emoji: "🚀", price: "₹7,990", period: "/month",
    desc: "For teams and agencies", highlight: false,
    features: ["Everything in Pro","10 team members","Custom AI training","White-label export","Advanced analytics","Bulk generation","Dedicated support","Custom integrations","SLA guarantee"],
    cta: "Contact Sales", href: "/login",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section" style={{ position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: "25%", width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "clamp(40px,7vw,72px)" }}>
          <span className="badge" style={{ marginBottom: 20 }}>💎 Simple pricing</span>
          <h2 style={{ fontSize: "clamp(28px,5.5vw,52px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 18 }}>
            Start free, <span className="grad-text">scale anytime</span>
          </h2>
          <p style={{ fontSize: "clamp(15px,3.5vw,18px)", color: "var(--c-muted)", maxWidth: 480, margin: "0 auto" }}>
            No hidden fees. Cancel anytime. 30-day money-back guarantee.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(16px,3vw,24px)", alignItems: "start" }}>
          {PLANS.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ position: "relative", borderRadius: 24, border: plan.highlight ? "1px solid rgba(99,102,241,0.5)" : "1px solid var(--c-border)", background: plan.highlight ? "linear-gradient(160deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))" : "var(--c-card)", padding: "clamp(24px,5vw,36px)", boxShadow: plan.highlight ? "0 0 60px rgba(99,102,241,0.15), var(--shadow-card)" : "var(--shadow-card)" }}>
              {plan.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "24px 24px 0 0", background: "linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)" }} />}
              {plan.badge && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 999, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}>
                    ✨ {plan.badge}
                  </span>
                </div>
              )}

              <div style={{ fontSize: 36, marginBottom: 16 }}>{plan.emoji}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{plan.name}</h3>
              <p style={{ fontSize: 14, color: "var(--c-muted)", marginBottom: 24 }}>{plan.desc}</p>

              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28 }}>
                <span style={{ fontSize: "clamp(36px,6vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: "var(--c-muted)" }}>{plan.period}</span>
              </div>

              <Link href={plan.href}
                className={plan.highlight ? "btn btn-primary" : "btn btn-ghost"}
                style={{ width: "100%", justifyContent: "center", marginBottom: 28, fontSize: 15 }}>
                {plan.cta}
              </Link>

              <div style={{ height: 1, background: "var(--c-border)", marginBottom: 24 }} />

              <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.72)" }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: plan.highlight ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1, color: plan.highlight ? "#a5b4fc" : "rgba(255,255,255,0.5)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
