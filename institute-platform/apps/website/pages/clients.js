import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { getDictionary, t } from "../lib/i18n";
import siteData from "../lib/data/siteData.json";

export default function Clients({ dict }) {
  const [activeSector, setActiveSector] = useState("All");

  const filteredLogos =
    activeSector === "All"
      ? siteData.clientLogos
      : siteData.clientLogos.filter((logo) => logo.sector === activeSector);

  return (
    <Layout dict={dict}>
      <Head>
        <title>{t(dict, "clients.title")} — {t(dict, "site.name")}</title>
        <meta name="description" content={t(dict, "clients.subtitle")} />
      </Head>

      {/* Page Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0F2016 0%, #163322 50%, #1B452D 100%)",
          padding: "clamp(3rem, 6vw, 5rem) 0",
          marginTop: "-80px",
          paddingTop: "calc(80px + clamp(3rem, 6vw, 5rem))",
          color: "var(--color-white)",
        }}
      >
        <div className="section-container">
          <nav style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{t(dict, "clients.title")}</span>
          </nav>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {t(dict, "clients.title")}
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600px",
              lineHeight: 1.7,
            }}
          >
            {t(dict, "clients.subtitle")}
          </p>
        </div>
      </section>

      {/* Sector Filters */}
      <section className="section-padding">
        <div className="section-container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2.5rem",
              justifyContent: "center",
            }}
          >
            {siteData.sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid",
                  borderColor: activeSector === sector ? "var(--color-primary)" : "var(--color-divider)",
                  background: activeSector === sector ? "var(--color-primary)" : "transparent",
                  color: activeSector === sector ? "var(--color-white)" : "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                {sector}
              </button>
            ))}
          </div>

          {/* Logo Grid */}
          <div className="logos-grid" style={{ display: "grid", gap: "1.5rem" }}>
            {filteredLogos.map((logo, i) => (
              <div
                key={i}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2.5rem 1.5rem",
                  minHeight: "160px",
                  textAlign: "center",
                  filter: "grayscale(100%)",
                  opacity: 0.6,
                  transition: "all var(--transition-smooth)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)";
                  e.currentTarget.style.opacity = "0.6";
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "var(--color-surface-offset)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--text-lg)",
                    color: "var(--color-primary)",
                  }}
                >
                  {logo.name.split(" ").pop().charAt(0)}
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {logo.name}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {logo.sector}
                </span>
              </div>
            ))}
          </div>

          {filteredLogos.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)" }}>
              No organizations found for this sector.
            </div>
          )}
        </div>

        <style jsx>{`
          .logos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 640px) {
            .logos-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (min-width: 1024px) {
            .logos-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* Testimonials placeholder */}
      <section style={{ background: "var(--color-surface-offset)" }} className="section-padding">
        <div className="section-container" style={{ textAlign: "center" }}>
          <span className="section-label">{t(dict, "clients.testimonialsLabel")}</span>
          <h2 style={{ fontSize: "var(--text-xl)", marginBottom: "2rem" }}>
            {t(dict, "clients.testimonialsTitle")}
          </h2>
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              padding: "2.5rem",
              background: "var(--color-surface)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4rem",
                color: "var(--color-primary)",
                opacity: 0.15,
                position: "absolute",
                top: "0.5rem",
                left: "1.5rem",
                lineHeight: 1,
              }}
            >
              &#8220;
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontStyle: "italic",
                color: "var(--color-text)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
                position: "relative",
              }}
            >
              The program was practical, well-organized, and highly relevant to our team. We saw measurable improvements within the first quarter.
            </p>
            <div>
              <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>— Participant Name</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                Job Title, Organization
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
