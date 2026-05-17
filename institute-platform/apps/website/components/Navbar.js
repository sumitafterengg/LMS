import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { t } from "../lib/i18n";

export default function Navbar({ dict }) {
  const router = useRouter();
  const nextLocale = router.locale === "ar" ? "en" : "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    ["/", "nav.home"],
    ["/services", "nav.services"],
    ["/clients", "nav.clients"],
    ["/events", "nav.events"],
    ["/contact", "nav.contact"],
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all var(--transition-smooth)",
          background: scrolled
            ? "rgba(28, 24, 21, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: scrolled ? "64px" : "80px",
              transition: "height var(--transition-smooth)",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 700,
                  color: "var(--color-white)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t(dict, "site.name")}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {navItems.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: isActive(href)
                      ? "var(--color-white)"
                      : "rgba(255,255,255,0.7)",
                    transition: "color var(--transition-fast)",
                    position: "relative",
                    paddingBottom: "4px",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--color-white)")}
                  onMouseLeave={(e) => {
                    if (!isActive(href)) e.target.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  {t(dict, label)}
                  {isActive(href) && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "var(--color-primary)",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link
                href={router.asPath}
                locale={nextLocale}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--color-white)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "var(--radius-pill)",
                  padding: "6px 16px",
                  textDecoration: "none",
                  transition: "all var(--transition-fast)",
                  letterSpacing: "0.05em",
                }}
              >
                {nextLocale === "ar" ? "عربي" : "EN"}
              </Link>
              <Link href="/contact" className="btn btn-primary" style={{ padding: "8px 24px", fontSize: "var(--text-xs)" }}>
                {t(dict, "common.getInTouch")}
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="hide-desktop"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: isOpen ? "0" : "5px",
                width: "32px",
                height: "32px",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 1002,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "white",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: isOpen ? "rotate(45deg) translateY(0)" : "none",
                  position: isOpen ? "absolute" : "relative",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "white",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "white",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: isOpen ? "rotate(-45deg) translateY(0)" : "none",
                  position: isOpen ? "absolute" : "relative",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(28, 24, 21, 0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        {navItems.map(([href, label], index) => (
          <Link
            key={href}
            href={href}
            style={{
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 600,
              color: isActive(href) ? "var(--color-primary)" : "var(--color-white)",
              transition: "all 0.3s ease",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transitionDelay: `${index * 0.08}s`,
            }}
          >
            {t(dict, label)}
          </Link>
        ))}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.3s ease",
            transitionDelay: "0.4s",
          }}
        >
          <Link
            href={router.asPath}
            locale={nextLocale}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--color-white)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "var(--radius-pill)",
              padding: "10px 24px",
              textDecoration: "none",
            }}
          >
            {nextLocale === "ar" ? "عربي" : "English"}
          </Link>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div style={{ height: "80px" }} />
    </>
  );
}
