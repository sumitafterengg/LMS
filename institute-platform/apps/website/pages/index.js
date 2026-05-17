import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { getDictionary, t } from "../lib/i18n";
import siteData from "../lib/data/siteData.json";

/* ============================================================
   Animated Counter hook
   ============================================================ */
function useCounter(end, duration = 2000, startWhenVisible = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startWhenVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startWhenVisible]);

  return { count, ref };
}

function StatCard({ value, label, suffix }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="card" style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          fontWeight: 700,
          color: "var(--color-primary)",
          lineHeight: 1,
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          marginTop: "0.5rem",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Home({ dict }) {
  const featuredService = siteData.services.find((s) => s.featured);
  const otherServices = siteData.services.filter((s) => !s.featured).slice(0, 3);

  return (
    <Layout dict={dict}>
      <Head>
        <title>{t(dict, "site.name")} — {t(dict, "home.heroLabel")}</title>
      </Head>

      {/* ============================================================
          SECTION 1 — HERO
          ============================================================ */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0F2016 0%, #163322 50%, #1B452D 100%)",
          overflow: "hidden",
          marginTop: "-80px",
          paddingTop: "80px",
        }}
      >
        {/* Decorative gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26,107,60,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,95,109,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="section-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: "720px" }}>
            <span className="section-label" style={{ color: "var(--color-primary)", fontSize: "var(--text-xs)" }}>
              {t(dict, "home.heroLabel")}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-hero)",
                fontWeight: 700,
                color: "var(--color-white)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
                whiteSpace: "pre-line",
              }}
            >
              {t(dict, "home.heroTitle")}
            </h1>
            <p
              style={{
                fontSize: "var(--text-lg)",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                maxWidth: "560px",
                marginBottom: "2.5rem",
              }}
            >
              {t(dict, "home.heroSubtitle")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/services" className="btn btn-primary">
                {t(dict, "home.ctaPrimary")}
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link href="/contact" className="btn btn-ghost-white">
                {t(dict, "home.ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, var(--color-bg))",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ============================================================
          SECTION 2 — ABOUT TEASER
          ============================================================ */}
      <section id="about-teaser" className="section-padding">
        <div className="section-container">
          <div className="about-grid" style={{ display: "grid", gap: "3rem", alignItems: "start" }}>
            {/* Left Column */}
            <div>
              <span className="section-label">{t(dict, "home.aboutLabel")}</span>
              <h2 style={{ fontSize: "var(--text-2xl)", color: "var(--color-text)", marginBottom: "1.5rem" }}>
                {t(dict, "home.aboutTitle")}
              </h2>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem", lineHeight: 1.8 }}>
                {t(dict, "home.aboutParagraph1")}
              </p>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.8 }}>
                {t(dict, "home.aboutParagraph2")}
              </p>
              <Link href="/services" className="btn btn-secondary">
                {t(dict, "home.aboutCta")}
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>

            {/* Right Column — Highlight Box */}
            <div
              style={{
                background: "var(--color-surface-offset)",
                borderRadius: "var(--radius-card)",
                padding: "2.5rem",
                borderLeft: "4px solid var(--color-primary)",
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
                  top: "1rem",
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
                  lineHeight: 1.7,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {t(dict, "home.aboutHighlight")}
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (min-width: 769px) {
            .about-grid { grid-template-columns: 1.4fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============================================================
          SECTION 3 — IMPACT / STATS
          ============================================================ */}
      <section
        id="stats"
        style={{ background: "var(--color-surface-offset)" }}
        className="section-padding"
      >
        <div className="section-container" style={{ textAlign: "center" }}>
          <span className="section-label">{t(dict, "home.statsLabel")}</span>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "3rem" }}>
            {t(dict, "home.statsTitle")}
          </h2>
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gap: "var(--grid-gap)",
            }}
          >
            {siteData.stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>

        <style jsx>{`
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 769px) {
            .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ============================================================
          SECTION 4 — SERVICES TEASER
          ============================================================ */}
      <section id="services-teaser" className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">{t(dict, "home.servicesLabel")}</span>
            <h2 style={{ fontSize: "var(--text-2xl)" }}>{t(dict, "home.servicesTitle")}</h2>
          </div>

          <div className="services-grid" style={{ display: "grid", gap: "var(--grid-gap)" }}>
            {/* Featured Service */}
            {featuredService && (
              <div
                className="featured-card"
                style={{
                  background: "linear-gradient(135deg, #0F2016, #163322)",
                  borderRadius: "var(--radius-card)",
                  padding: "2.5rem",
                  color: "var(--color-white)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "320px",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "rgba(26,107,60,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <Icon name={featuredService.icon} size={28} color="var(--color-primary)" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", marginBottom: "1rem" }}>
                    {featuredService.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                    {featuredService.summary}
                  </p>
                </div>
                <Link
                  href="/services"
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1.5rem",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {t(dict, "common.learnMore")}
                  <Icon name="arrowRight" size={16} color="var(--color-primary)" />
                </Link>
              </div>
            )}

            {/* Other Services */}
            <div style={{ display: "grid", gap: "var(--grid-gap)" }}>
              {otherServices.map((service) => (
                <div key={service.id} className="card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--color-surface-offset)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={service.icon} size={22} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.25rem" }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                      {service.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/services" className="btn btn-secondary">
              {t(dict, "home.servicesCta")}
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>

        <style jsx>{`
          @media (min-width: 769px) {
            .services-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============================================================
          SECTION 5 — CORE VALUES
          ============================================================ */}
      <section
        id="values"
        style={{ background: "var(--color-surface-offset)" }}
        className="section-padding"
      >
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">{t(dict, "home.valuesLabel")}</span>
            <h2 style={{ fontSize: "var(--text-2xl)" }}>{t(dict, "home.valuesTitle")}</h2>
          </div>
          <div
            className="values-grid"
            style={{ display: "grid", gap: "var(--grid-gap)" }}
          >
            {siteData.values.map((value, i) => (
              <div
                key={i}
                className="card"
                style={{
                  textAlign: "center",
                  padding: "2rem 1.5rem",
                  background: "var(--color-surface)",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--color-surface-offset)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  <Icon name={value.icon} size={24} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 769px) {
            .values-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ============================================================
          SECTION 6 — CLIENT / PARTNER LOGOS
          ============================================================ */}
      <section id="partners" className="section-padding">
        <div className="section-container" style={{ textAlign: "center" }}>
          <span className="section-label">{t(dict, "home.partnersLabel")}</span>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "3rem" }}>
            {t(dict, "home.partnersTitle")}
          </h2>
          <div
            className="logos-grid"
            style={{ display: "grid", gap: "1.5rem" }}
          >
            {siteData.clientLogos.slice(0, 6).map((logo, i) => (
              <div
                key={i}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-card)",
                  padding: "2rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100px",
                  transition: "all var(--transition-smooth)",
                  cursor: "pointer",
                  filter: "grayscale(100%)",
                  opacity: 0.6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)";
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)";
                  e.currentTarget.style.opacity = "0.6";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: "var(--color-text-muted)",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/clients" className="btn btn-secondary">
              {t(dict, "common.viewAll")}
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>

        <style jsx>{`
          .logos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 640px) {
            .logos-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (min-width: 1024px) {
            .logos-grid { grid-template-columns: repeat(6, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ============================================================
          SECTION 7 — ACCREDITATIONS
          ============================================================ */}
      <section
        id="accreditations"
        style={{ background: "var(--color-surface-offset)" }}
        className="section-padding"
      >
        <div className="section-container" style={{ textAlign: "center" }}>
          <span className="section-label">{t(dict, "home.accreditationsLabel")}</span>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "3rem" }}>
            {t(dict, "home.accreditationsTitle")}
          </h2>
          <div
            className="accreditations-grid"
            style={{ display: "grid", gap: "var(--grid-gap)" }}
          >
            {siteData.accreditations.map((accred, i) => (
              <div
                key={i}
                className="card-flat"
                style={{ textAlign: "center", padding: "2rem 1.5rem" }}
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
                    margin: "0 auto 1rem",
                  }}
                >
                  <Icon name="award" size={28} color="var(--color-accent)" />
                </div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {accred.name}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
                  {accred.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .accreditations-grid {
            grid-template-columns: 1fr;
          }
          @media (min-width: 769px) {
            .accreditations-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ============================================================
          SECTION 8 — FINAL CTA BANNER
          ============================================================ */}
      <section
        id="cta-banner"
        style={{
          background: "linear-gradient(135deg, #0F2016 0%, #163322 50%, #1B452D 100%)",
          color: "var(--color-white)",
          padding: "clamp(4rem, 8vw, 7rem) 0",
          textAlign: "center",
        }}
      >
        <div className="section-container">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "1rem",
              maxWidth: "600px",
              margin: "0 auto 1rem",
            }}
          >
            {t(dict, "home.ctaBannerTitle")}
          </h2>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "500px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            {t(dict, "home.ctaBannerSubtitle")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              {t(dict, "common.getInTouch")}
            </Link>
            <Link href="/services" className="btn btn-ghost-white">
              {t(dict, "common.browseServices")}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
