"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  { q: "How does CaptionAI work?", a: "Upload any image and our AI analyzes it visually to understand context, subject, and mood. It then generates platform-specific captions tailored to each social network's best practices, character limits, and audience expectations." },
  { q: "Which AI model powers caption generation?", a: "CaptionAI uses Groq's ultra-fast inference engine running Llama 4 Scout — a state-of-the-art multimodal model capable of understanding images and generating highly engaging text in under 3 seconds." },
  { q: "What image formats are supported?", a: "We support JPEG, PNG, WebP, and GIF formats up to 10MB. For best results, use high-quality images with clear subjects. Both portrait and landscape orientations work perfectly." },
  { q: "Are my images stored or shared?", a: "Images are uploaded to Cloudinary's secure CDN solely to pass the URL to our AI model. We do not share, sell, or use your images for training. You can configure your own Cloudinary account for full control." },
  { q: "Can I customize the tone of captions?", a: "Yes! Choose from 6 tone styles: Viral, Funny, Luxury, Emotional, Professional, and Inspirational. Each style completely changes the voice, vocabulary, and structure of generated captions." },
  { q: "How many captions can I generate for free?", a: "The Free plan includes 15 generations per day. Each generation produces captions for all 4 platforms simultaneously plus 30 hashtags. Upgrade to Pro for unlimited generations." },
  { q: "Is payment secure?", a: "Yes! Payments are processed securely via Razorpay, India's most trusted payment gateway. We never store your card details. Your financial data is fully encrypted and PCI-DSS compliant." },
  { q: "What is the refund policy?", a: "We offer a 30-day money-back guarantee on all paid plans, no questions asked. Simply contact support and we'll process your refund within 2–3 business days." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "clamp(40px,7vw,64px)" }}>
          <span className="badge" style={{ marginBottom: 20 }}>❓ FAQ</span>
          <h2 style={{ fontSize: "clamp(28px,5.5vw,52px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 18 }}>
            Common <span className="grad-text">questions</span>
          </h2>
          <p style={{ fontSize: "clamp(15px,3.5vw,18px)", color: "var(--c-muted)" }}>Everything you need to know about CaptionAI.</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              style={{ borderRadius: 18, border: `1px solid ${open === i ? "rgba(99,102,241,0.3)" : "var(--c-border)"}`, background: open === i ? "rgba(99,102,241,0.06)" : "var(--c-card)", overflow: "hidden", transition: "all 0.2s" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "clamp(16px,3.5vw,22px) clamp(16px,3.5vw,24px)", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: "clamp(14px,3.2vw,16px)", fontWeight: 600, color: open === i ? "#fff" : "rgba(255,255,255,0.82)", lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: open === i ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: open === i ? "#a5b4fc" : "var(--c-muted)", flexShrink: 0, transition: "all 0.2s" }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}>
                    <div style={{ padding: "0 clamp(16px,3.5vw,24px) clamp(16px,3.5vw,22px)" }}>
                      <p style={{ fontSize: "clamp(13px,3vw,15px)", color: "var(--c-muted)", lineHeight: 1.75 }}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
