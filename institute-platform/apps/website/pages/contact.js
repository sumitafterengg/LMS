import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { getDictionary, t } from "../lib/i18n";

export default function Contact({ dict }) {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t(dict, "forms.required");
    if (!formData.email.trim()) newErrors.email = t(dict, "forms.required");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.message.trim()) newErrors.message = t(dict, "forms.required");
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiBaseUrl}/api/feedback/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ fullName: "", organization: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setErrors(data.errors || { general: "Something went wrong" });
      }
    } catch (err) {
      setErrors({ general: "Could not connect to server" });
    } finally {
      setLoading(false);
    }
  };

  const subjectOptions = [
    ["training", t(dict, "forms.subjectOptions.training")],
    ["consulting", t(dict, "forms.subjectOptions.consulting")],
    ["partnership", t(dict, "forms.subjectOptions.partnership")],
    ["general", t(dict, "forms.subjectOptions.general")],
  ];

  return (
    <Layout dict={dict}>
      <Head>
        <title>{t(dict, "contact.title")} — {t(dict, "site.name")}</title>
        <meta name="description" content={t(dict, "contact.subtitle")} />
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
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{t(dict, "contact.title")}</span>
          </nav>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {t(dict, "contact.title")}
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600px",
              lineHeight: 1.7,
            }}
          >
            {t(dict, "contact.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding">
        <div className="section-container">
          <div className="contact-grid" style={{ display: "grid", gap: "3rem" }}>
            {/* Left — Form */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  marginBottom: "2rem",
                }}
              >
                {t(dict, "contact.formTitle")}
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Success */}
                {success && (
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      background: "rgba(46, 125, 50, 0.08)",
                      border: "1px solid rgba(46, 125, 50, 0.2)",
                      borderRadius: "12px",
                      color: "var(--color-success)",
                      marginBottom: "1.5rem",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                    }}
                  >
                    ✓ Message sent successfully! We'll be in touch soon.
                  </div>
                )}

                {/* General error */}
                {errors.general && (
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      background: "rgba(198, 40, 40, 0.08)",
                      border: "1px solid rgba(198, 40, 40, 0.2)",
                      borderRadius: "12px",
                      color: "var(--color-error)",
                      marginBottom: "1.5rem",
                      fontSize: "var(--text-sm)",
                    }}
                  >
                    {errors.general}
                  </div>
                )}

                {/* Name + Organization row */}
                <div className="form-row" style={{ display: "grid", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">
                      {t(dict, "forms.fullName")} <span style={{ color: "var(--color-error)" }}>*</span>
                    </label>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-input"
                      style={errors.fullName ? { borderColor: "var(--color-error)" } : {}}
                    />
                    {errors.fullName && (
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--color-error)", marginTop: "4px", display: "block" }}>
                        {errors.fullName}
                      </span>
                    )}
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">{t(dict, "forms.organization")}</label>
                    <input
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Email + Phone row */}
                <div className="form-row" style={{ display: "grid", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">
                      {t(dict, "forms.email")} <span style={{ color: "var(--color-error)" }}>*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      style={errors.email ? { borderColor: "var(--color-error)" } : {}}
                    />
                    {errors.email && (
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--color-error)", marginTop: "4px", display: "block" }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">{t(dict, "forms.phone")}</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label className="form-label">{t(dict, "forms.subject")}</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">— Select —</option>
                    {subjectOptions.map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>
                      {t(dict, "forms.message")} <span style={{ color: "var(--color-error)" }}>*</span>
                    </label>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                      {formData.message.length}/500
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={500}
                    rows={5}
                    className="form-input form-textarea"
                    style={{
                      marginTop: "0.5rem",
                      ...(errors.message ? { borderColor: "var(--color-error)" } : {}),
                    }}
                  />
                  {errors.message && (
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-error)", marginTop: "4px", display: "block" }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending..." : t(dict, "common.sendMessage")}
                  {!loading && <Icon name="arrowRight" size={16} />}
                </button>
              </form>
            </div>

            {/* Right — Contact Details */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  marginBottom: "2rem",
                }}
              >
                {t(dict, "contact.title")}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
                {/* Address */}
                <div
                  className="card-flat"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    padding: "1.25rem",
                  }}
                >
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
                    <Icon name="mapPin" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "2px" }}>Address</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                      {t(dict, "contact.address")}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div
                  className="card-flat"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    padding: "1.25rem",
                  }}
                >
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
                    <Icon name="mail" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "2px" }}>Email</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                      {t(dict, "contact.email")}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div
                  className="card-flat"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    padding: "1.25rem",
                  }}
                >
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
                    <Icon name="phone" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "2px" }}>Phone</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                      {t(dict, "contact.phone")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div
                style={{
                  aspectRatio: "16/10",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-card)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                  <Icon name="mapPin" size={32} color="var(--color-divider)" />
                  <p style={{ marginTop: "0.75rem", fontSize: "var(--text-sm)" }}>Map will be embedded here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          @media (min-width: 769px) {
            .contact-grid { grid-template-columns: 1.2fr 1fr !important; }
            .form-row { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* Quick Contact Banner */}
      <section
        style={{
          background: "var(--color-surface-offset)",
          padding: "clamp(3rem, 5vw, 4rem) 0",
        }}
      >
        <div className="section-container" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <Icon name="messageCircle" size={28} color="var(--color-accent)" />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {t(dict, "contact.quickContactTitle")}
            </h3>
          </div>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
              marginBottom: "1.5rem",
              maxWidth: "400px",
              margin: "0 auto 1.5rem",
            }}
          >
            {t(dict, "contact.quickContactSubtitle")}
          </p>
          <a href="#" className="btn btn-accent">
            {t(dict, "contact.quickContactCta")}
            <Icon name="arrowRight" size={16} />
          </a>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
