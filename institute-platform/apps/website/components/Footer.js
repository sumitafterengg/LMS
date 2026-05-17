import Link from "next/link";
import { t } from "../lib/i18n";

export default function Footer({ dict }) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    ["/", "nav.home"],
    ["/services", "nav.services"],
    ["/clients", "nav.clients"],
    ["/events", "nav.events"],
    ["/contact", "nav.contact"],
  ];

  return (
    <footer
      style={{
        background: "var(--color-text)",
        color: "rgba(255,255,255,0.85)",
        marginTop: 0,
      }}
    >
      <div className="section-container" style={{ paddingTop: "4rem", paddingBottom: "2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "2.5rem",
          }}
          className="footer-grid"
        >
          {/* Column 1 — Brand */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                color: "var(--color-white)",
                marginBottom: "1rem",
              }}
            >
              {t(dict, "site.name")}
            </h2>
            <p
              style={{
                fontSize: "var(--text-sm)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "320px",
              }}
            >
              {t(dict, "site.tagline")}
            </p>
            {/* Social Links Placeholder */}
            <div style={{ display: "flex", gap: "12px", marginTop: "1.5rem" }}>
              {["LinkedIn", "Instagram", "WhatsApp"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  aria-label={platform}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--color-primary)";
                    e.target.style.borderColor = "var(--color-primary)";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.borderColor = "rgba(255,255,255,0.2)";
                    e.target.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-white)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1.25rem",
              }}
            >
              Quick Links
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {quickLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "var(--text-sm)",
                    textDecoration: "none",
                    transition: "color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--color-primary)")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
                >
                  {t(dict, label)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Contact Summary */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-white)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1.25rem",
              }}
            >
              {t(dict, "contact.title")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)" }}>
              <p style={{ margin: 0, display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-primary)", fontSize: "1.1rem", lineHeight: 1 }}>📍</span>
                {t(dict, "contact.address")}
              </p>
              <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-primary)", fontSize: "1.1rem", lineHeight: 1 }}>📧</span>
                {t(dict, "contact.email")}
              </p>
              <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-primary)", fontSize: "1.1rem", lineHeight: 1 }}>📞</span>
                {t(dict, "contact.phone")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "var(--text-xs)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <p style={{ margin: 0 }}>© {currentYear} {t(dict, "site.name")}. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 769px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
