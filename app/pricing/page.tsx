"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";

declare global { interface Window { Razorpay: any; } }

const PLANS = [
  { id: "free", name: "Free", emoji: "🆓", price: "₹0", period: "forever", desc: "Perfect to get started", highlight: false, razorpay: null,
    features: ["15 generations / day","All 4 platforms","Viral hashtags","Copy to clipboard","All 6 tone styles","Caption history"], cta: "Get Started Free", href: "/generate" },
  { id: "pro", name: "Pro", emoji: "👑", price: "₹1,990", period: "/month", desc: "For serious content creators", highlight: true, razorpay: "pro", badge: "Most Popular",
    features: ["Unlimited generations","All 4 platforms","Viral hashtags","Download all captions","All 6 tone styles","Priority AI","Full history","API access","Priority support"], cta: "Upgrade to Pro", href: null },
  { id: "agency", name: "Agency", emoji: "🚀", price: "₹7,990", period: "/month", desc: "For teams and agencies", highlight: false, razorpay: "agency",
    features: ["Everything in Pro","10 team members","Custom AI training","White-label export","Advanced analytics","Bulk generation","Dedicated support","Custom integrations","SLA guarantee"], cta: "Get Agency", href: null },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const buy = async (plan: typeof PLANS[0]) => {
    if (!plan.razorpay) { router.push(plan.href!); return; }
    if (!session) { toast.error("Please sign in first"); router.push("/login"); return; }
    setBusy(plan.id);
    try {
      const res = await fetch("/api/payment/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: plan.razorpay }) });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error);
      const options = {
        key: order.keyId, amount: order.amount, currency: order.currency,
        name: "CaptionAI", description: `${plan.name} Plan`, order_id: order.orderId,
        handler: async (r: any) => {
          const v = await fetch("/api/payment/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...r, plan: plan.razorpay }) });
          const vd = await v.json();
          if (vd.success) { toast.success(`🎉 ${plan.name} plan activated!`); setTimeout(() => router.push("/dashboard"), 1500); }
          else toast.error("Verification failed");
        },
        prefill: { name: session.user?.name || "", email: session.user?.email || "" },
        theme: { color: "#6366f1" },
        modal: { ondismiss: () => setBusy(null) },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => { toast.error("Payment failed. Please try again."); setBusy(null); });
      rzp.open();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Error"); setBusy(null); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)" }}>
      <Navbar />
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-5%", left: "20%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "45vw", height: "45vw", maxWidth: 550, maxHeight: 550, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 65%)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(100px,12vw,130px)", paddingBottom: "clamp(40px,6vw,80px)" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "clamp(48px,8vw,80px)" }}>
          <span className="badge" style={{ marginBottom: 22 }}>💎 Simple pricing</span>
          <h1 style={{ fontSize: "clamp(32px,7vw,68px)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: 20 }}>
            Start free,{" "}
            <span className="grad-text">scale anytime</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,3.5vw,19px)", color: "var(--c-muted)", maxWidth: 500, margin: "0 auto 28px" }}>
            No hidden fees. Cancel anytime. 30-day money-back guarantee.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 24px", fontSize: 13, color: "var(--c-dim)" }}>
            {["🔒 Secure Razorpay payment", "✓ Cancel anytime", "✨ Instant activation"].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(16px,3vw,24px)", alignItems: "start", marginBottom: "clamp(48px,8vw,96px)" }}>
          {PLANS.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ position: "relative", borderRadius: 24, border: plan.highlight ? "1px solid rgba(99,102,241,0.55)" : "1px solid var(--c-border)", background: plan.highlight ? "linear-gradient(160deg,rgba(99,102,241,0.13),rgba(139,92,246,0.07))" : "var(--c-card)", padding: "clamp(24px,5vw,38px)", boxShadow: plan.highlight ? "0 0 70px rgba(99,102,241,0.18), var(--shadow-card)" : "var(--shadow-card)" }}>
              {plan.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "24px 24px 0 0", background: "linear-gradient(90deg,#6366f1,#8b5cf6,#c084fc)" }} />}
              {plan.badge && (
                <div style={{ position: "absolute", top: -15, left: "50%", transform: "translateX(-50%)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 999, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", boxShadow: "0 4px 18px rgba(99,102,241,0.45)" }}>✨ {plan.badge}</span>
                </div>
              )}

              <div style={{ fontSize: 38, marginBottom: 18 }}>{plan.emoji}</div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{plan.name}</h3>
              <p style={{ fontSize: 14, color: "var(--c-muted)", marginBottom: 24 }}>{plan.desc}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 28 }}>
                <span style={{ fontSize: "clamp(38px,6vw,54px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: "var(--c-muted)" }}>{plan.period}</span>
              </div>

              <button onClick={() => buy(plan)} disabled={!!busy}
                className={plan.highlight ? "btn btn-primary" : "btn btn-ghost"}
                style={{ width: "100%", justifyContent: "center", marginBottom: 28, fontSize: 15, opacity: busy && busy !== plan.id ? 0.5 : 1 }}>
                {busy === plan.id
                  ? <><span className="spin" style={{ width: 17, height: 17, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} /> Processing…</>
                  : plan.cta}
              </button>

              <div style={{ height: 1, background: "var(--c-border)", marginBottom: 24 }} />
              <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.72)" }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: plan.highlight ? "rgba(99,102,241,0.22)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1, color: plan.highlight ? "#a5b4fc" : "var(--c-muted)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}
