import Link from "next/link";

const COLS = [
  { title: "Product", links: [{ l: "Generate", h: "/generate" }, { l: "Dashboard", h: "/dashboard" }, { l: "Pricing", h: "/pricing" }, { l: "API", h: "#" }] },
  { title: "Company", links: [{ l: "About", h: "#" }, { l: "Blog", h: "#" }, { l: "Careers", h: "#" }, { l: "Contact", h: "#" }] },
  { title: "Legal", links: [{ l: "Privacy Policy", h: "#" }, { l: "Terms of Service", h: "#" }, { l: "Cookie Policy", h: "#" }, { l: "GDPR", h: "#" }] },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--c-border)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
      <div className="container" style={{ padding: "clamp(48px,8vw,80px) 20px clamp(32px,5vw,48px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(200px,100%),1fr))", gap: "clamp(32px,5vw,48px)", marginBottom: "clamp(32px,5vw,48px)" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, textDecoration: "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>✨</div>
              <span style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>CaptionAI</span>
            </Link>
            <p style={{ fontSize: 14, color: "var(--c-muted)", lineHeight: 1.7, marginBottom: 20, maxWidth: 240 }}>
              Generate viral captions for every platform in seconds with AI.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ l: "𝕏", h: "#" }, { l: "GH", h: "#" }, { l: "in", h: "#" }].map(s => (
                <a key={s.l} href={s.h}
                  style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--c-muted)", transition: "all 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "var(--c-muted)"; }}>
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(link => (
                  <li key={link.l}>
                    <Link href={link.h} style={{ fontSize: 14, color: "var(--c-muted)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-muted)"}>
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "var(--c-border)", marginBottom: 28 }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <p style={{ fontSize: 13, color: "var(--c-dim)" }}>© 2025 CaptionAI. All rights reserved.</p>
          <p style={{ fontSize: 13, color: "var(--c-dim)" }}>Built with ❤️ using Next.js & Groq AI</p>
        </div>
      </div>
    </footer>
  );
}
