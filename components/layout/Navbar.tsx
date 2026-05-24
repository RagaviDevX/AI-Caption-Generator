"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/generate", label: "Generate" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const path = usePathname();
  const { data: session, status } = useSession();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setDrawerOpen(false); setDropOpen(false); }, [path]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const isActive = (href: string) => href === "/" ? path === "/" : path.startsWith(href);

  const S = {
    nav: {
      position: "fixed" as const, top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s",
      background: scrolled ? "rgba(5,5,8,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
    },
    inner: {
      maxWidth: 1180, margin: "0 auto", padding: "0 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
    },
    logo: {
      display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0,
    },
    logoIcon: {
      width: 36, height: 36, borderRadius: 10,
      background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 18, boxShadow: "0 0 18px rgba(99,102,241,0.5)", flexShrink: 0,
    },
    logoText: { fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" },
    desktopNav: { display: "flex", alignItems: "center", gap: 2 },
    navLink: (active: boolean): React.CSSProperties => ({
      padding: "7px 14px", borderRadius: 10, fontSize: 14, fontWeight: 500,
      textDecoration: "none", transition: "all 0.15s", display: "block",
      background: active ? "rgba(255,255,255,0.09)" : "transparent",
      color: active ? "#fff" : "rgba(255,255,255,0.58)",
    }),
    right: { display: "flex", alignItems: "center", gap: 10 },
    avatar: { width: 30, height: 30, borderRadius: "50%", objectFit: "cover" as const },
    avatarFallback: {
      width: 30, height: 30, borderRadius: "50%",
      background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
    },
  };

  return (
    <>
      <nav style={S.nav}>
        <div style={S.inner}>
          {/* Logo */}
          <Link href="/" style={S.logo}>
            <div style={S.logoIcon}>✨</div>
            <span style={S.logoText}>CaptionAI</span>
          </Link>

          {/* Desktop centre links */}
          <div style={{ ...S.desktopNav, position: "absolute", left: "50%", transform: "translateX(-50%)" }}
            className="desktop-nav">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} style={S.navLink(isActive(l.href))}>{l.label}</Link>
            ))}
            {session && <Link href="/dashboard" style={S.navLink(isActive("/dashboard"))}>Dashboard</Link>}
          </div>

          {/* Desktop right */}
          <div style={S.right} className="desktop-nav">
            {status === "loading" ? (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
            ) : session ? (
              <div ref={dropRef} style={{ position: "relative" }}>
                <button onClick={() => setDropOpen(d => !d)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px 6px 6px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", cursor: "pointer" }}>
                  {session.user?.image
                    ? <img src={session.user.image} alt="" style={S.avatar} />
                    : <div style={S.avatarFallback}>{session.user?.name?.[0]?.toUpperCase()}</div>}
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", fontWeight: 500, maxWidth: 88, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "none", display: "block" }}>▼</span>
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.96 }} transition={{ duration: 0.15 }}
                      style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 210, borderRadius: 18, background: "rgba(8,8,16,0.98)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(24px)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", overflow: "hidden" }}>
                      <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user?.name}</p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user?.email}</p>
                      </div>
                      <div style={{ padding: 6 }}>
                        {[{ href: "/dashboard", e: "📊", l: "Dashboard" }, { href: "/profile", e: "⚙️", l: "Profile Settings" }].map(item => (
                          <Link key={item.href} href={item.href}
                            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 11, fontSize: 13, color: "rgba(255,255,255,0.68)", textDecoration: "none", transition: "all 0.15s" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.68)"; }}>
                            <span>{item.e}</span> {item.l}
                          </Link>
                        ))}
                        <button onClick={() => signOut({ callbackUrl: "/" })}
                          style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 11, fontSize: 13, color: "#f87171", background: "transparent", border: "none", cursor: "pointer", transition: "all 0.15s", textAlign: "left" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.1)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                          🚪 Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", padding: "7px 14px", borderRadius: 10, transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"}>
                  Sign in
                </Link>
                <Link href="/generate" className="btn btn-primary btn-sm" style={{ fontSize: 14 }}>⚡ Try Free</Link>
              </>
            )}
          </div>

          {/* Mobile: avatar + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="mobile-nav">
            {session?.user?.image && (
              <Link href="/dashboard"><img src={session.user.image} alt="" style={{ ...S.avatar, width: 34, height: 34, border: "2px solid rgba(99,102,241,0.4)" }} /></Link>
            )}
            <button onClick={() => setDrawerOpen(d => !d)}
              style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {drawerOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }} />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 230 }}
              style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 95, width: "min(310px,88vw)", background: "rgba(6,6,12,0.98)", borderLeft: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" }}>

              {/* Drawer header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>✨</div>
                  <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>CaptionAI</span>
                </div>
                <button onClick={() => setDrawerOpen(false)} style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>

              {/* User info */}
              {session && (
                <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12 }}>
                  {session.user?.image
                    ? <img src={session.user.image} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                    : <div style={{ ...S.avatarFallback, width: 44, height: 44, fontSize: 18 }}>{session.user?.name?.[0]?.toUpperCase()}</div>}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user?.name}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user?.email}</p>
                  </div>
                </div>
              )}

              {/* Links */}
              <nav style={{ flex: 1, overflowY: "auto", padding: "12px 12px" }}>
                {[...LINKS, ...(session ? [{ href: "/dashboard", label: "📊 Dashboard" }, { href: "/profile", label: "⚙️ Profile Settings" }] : [])].map(l => (
                  <Link key={l.href} href={l.href}
                    style={{ display: "block", padding: "13px 16px", borderRadius: 13, fontSize: 15, fontWeight: 500, marginBottom: 4, transition: "all 0.15s", color: isActive(l.href) ? "#fff" : "rgba(255,255,255,0.6)", background: isActive(l.href) ? "rgba(255,255,255,0.08)" : "transparent" }}>
                    {l.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom actions */}
              <div style={{ padding: "16px 16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 10 }}>
                {session ? (
                  <button onClick={() => signOut({ callbackUrl: "/" })}
                    style={{ padding: "14px", borderRadius: 13, border: "1px solid rgba(248,113,113,0.28)", background: "rgba(248,113,113,0.07)", color: "#f87171", fontSize: 14, fontWeight: 600 }}>
                    🚪 Sign Out
                  </button>
                ) : (
                  <>
                    <Link href="/login" style={{ display: "block", textAlign: "center", padding: "13px", borderRadius: 13, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>Sign in</Link>
                    <Link href="/generate" className="btn btn-primary" style={{ justifyContent: "center" }}>⚡ Generate Free</Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav  { display: none  !important; }
        @media (max-width: 860px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
