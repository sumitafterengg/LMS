import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { getDictionary, t } from "../lib/i18n";
import siteData from "../lib/data/siteData.json";

export default function Services({ dict }) {
  const [activeCategory, setActiveCategory] = useState(siteData.services[0]?.id || "");

  const activeService = siteData.services.find((s) => s.id === activeCategory);

  return (
    <Layout dict={dict}>
      <Head>
        <title>{t(dict, "services.title")} — {t(dict, "site.name")}</title>
        <meta name="description" content={t(dict, "services.subtitle")} />
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
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{t(dict, "services.title")}</span>
          </nav>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {t(dict, "services.title")}
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600px",
              lineHeight: 1.7,
            }}
          >
            {t(dict, "services.subtitle")}
          </p>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">{t(dict, "services.diffLabel")}</span>
            <h2 style={{ fontSize: "var(--text-xl)" }}>{t(dict, "services.diffTitle")}</h2>
          </div>
          <div className="diff-grid" style={{ display: "grid", gap: "var(--grid-gap)" }}>
            {siteData.differentiators.map((diff, i) => (
              <div
                key={i}
                className="card"
                style={{ textAlign: "center", padding: "2rem 1.5rem" }}
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
                  <Icon name={diff.icon} size={24} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {diff.title}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .diff-grid {
            grid-template-columns: 1fr;
          }
          @media (min-width: 769px) {
            .diff-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* Service Categories — Sidebar + Content */}
      <section style={{ background: "var(--color-surface-offset)" }} className="section-padding">
        <div className="section-container">
          <div className="services-layout" style={{ display: "grid", gap: "2rem" }}>
            {/* Sidebar / Top tabs on mobile */}
            <div className="services-sidebar">
              <nav
                className="services-nav"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {siteData.services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveCategory(service.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.875rem 1.25rem",
                      borderRadius: "12px",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: activeCategory === service.id ? 600 : 400,
                      color: activeCategory === service.id ? "var(--color-white)" : "var(--color-text)",
                      background: activeCategory === service.id ? "var(--color-primary)" : "transparent",
                      transition: "all var(--transition-fast)",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <Icon
                      name={service.icon}
                      size={18}
                      color={activeCategory === service.id ? "var(--color-white)" : "var(--color-primary)"}
                    />
                    {service.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div>
              {activeService && (
                <div
                  className="card"
                  style={{
                    padding: "2.5rem",
                    background: "var(--color-surface)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: "var(--color-surface-offset)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={activeService.icon} size={24} color="var(--color-primary)" />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xl)",
                        fontWeight: 600,
                      }}
                    >
                      {activeService.title}
                    </h3>
                  </div>

                  <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
                    {activeService.summary}
                  </p>

                  <h4
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--color-primary)",
                      marginBottom: "1rem",
                    }}
                  >
                    Programs Include
                  </h4>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                    {activeService.programs.map((program, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text)",
                          padding: "0.625rem 1rem",
                          background: "var(--color-surface-offset)",
                          borderRadius: "8px",
                        }}
                      >
                        <Icon name="chevronRight" size={16} color="var(--color-primary)" />
                        {program}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "2rem" }}>
                    <Link href="/contact" className="btn btn-primary">
                      {t(dict, "common.inquire")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .services-layout {
            grid-template-columns: 1fr;
          }
          .services-nav {
            flex-direction: row !important;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          .services-nav button {
            white-space: nowrap;
            min-width: max-content;
          }
          @media (min-width: 769px) {
            .services-layout { grid-template-columns: 300px 1fr !important; }
            .services-sidebar { position: sticky; top: 100px; align-self: start; }
            .services-nav {
              flex-direction: column !important;
              overflow-x: visible;
              padding-bottom: 0;
            }
            .services-nav button { min-width: auto; }
          }
        `}</style>
      </section>

      {/* Delivery Methods */}
      <section className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">{t(dict, "services.deliveryLabel")}</span>
            <h2 style={{ fontSize: "var(--text-xl)" }}>{t(dict, "services.deliveryTitle")}</h2>
          </div>
          <div className="delivery-grid" style={{ display: "grid", gap: "var(--grid-gap)" }}>
            {siteData.deliveryMethods.map((method) => (
              <div key={method.step} className="card" style={{ position: "relative", padding: "2rem 2rem 2rem 5rem" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "1.5rem",
                    top: "2rem",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    color: "var(--color-white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {method.step}
                </div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {method.title}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .delivery-grid {
            grid-template-columns: 1fr;
          }
          @media (min-width: 769px) {
            .delivery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))",
          color: "var(--color-white)",
          textAlign: "center",
          padding: "clamp(3rem, 6vw, 5rem) 0",
        }}
      >
        <div className="section-container">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {t(dict, "services.ctaTitle")}
          </h2>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "500px",
              margin: "0 auto 2rem",
            }}
          >
            {t(dict, "services.ctaSubtitle")}
          </p>
          <Link href="/contact" className="btn btn-white">
            {t(dict, "common.requestConsultation")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
