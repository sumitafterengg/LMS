import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { getDictionary, t } from "../lib/i18n";
import siteData from "../lib/data/siteData.json";

export default function Events({ dict }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const filteredAlbums =
    activeFilter === "All"
      ? siteData.albums
      : siteData.albums.filter((a) => a.category === activeFilter);

  // Placeholder colors for album covers (since we don't have actual images yet)
  const coverColors = [
    "linear-gradient(135deg, #1A6B3C 0%, #114929 100%)",
    "linear-gradient(135deg, #255F6D 0%, #1d4d59 100%)",
    "linear-gradient(135deg, #334155 0%, #0F172A 100%)",
    "linear-gradient(135deg, #475569 0%, #334155 100%)",
    "linear-gradient(135deg, #1A6B3C 0%, #C29B38 100%)",
    "linear-gradient(135deg, #0F172A 0%, #1A6B3C 100%)",
  ];

  return (
    <Layout dict={dict}>
      <Head>
        <title>{t(dict, "events.title")} — {t(dict, "site.name")}</title>
        <meta name="description" content={t(dict, "events.subtitle")} />
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
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{t(dict, "events.title")}</span>
          </nav>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {t(dict, "events.title")}
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600px",
              lineHeight: 1.7,
            }}
          >
            {t(dict, "events.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter + Album Grid */}
      <section className="section-padding">
        <div className="section-container">
          {/* Filter Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2.5rem",
              justifyContent: "center",
            }}
          >
            {siteData.albumCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid",
                  borderColor: activeFilter === cat ? "var(--color-primary)" : "var(--color-divider)",
                  background: activeFilter === cat ? "var(--color-primary)" : "transparent",
                  color: activeFilter === cat ? "var(--color-white)" : "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Album Grid */}
          <div className="albums-grid" style={{ display: "grid", gap: "var(--grid-gap)" }}>
            {filteredAlbums.map((album, i) => (
              <div
                key={album.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedAlbum(album)}
              >
                {/* Cover Image placeholder */}
                <div
                  style={{
                    aspectRatio: "16/10",
                    background: coverColors[i % coverColors.length],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Icon name="camera" size={40} color="rgba(255,255,255,0.25)" />
                  {/* Photo count badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "var(--radius-pill)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Icon name="camera" size={12} color="white" />
                    {album.photoCount} {t(dict, "events.photos")}
                  </div>
                  {/* Year badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      background: "var(--color-primary)",
                      color: "white",
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "var(--radius-pill)",
                    }}
                  >
                    {album.year}
                  </div>
                </div>

                {/* Card content */}
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {album.title}
                  </h3>
                  {album.subtitle && (
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-muted)",
                        margin: 0,
                      }}
                    >
                      {album.subtitle}
                    </p>
                  )}
                  <div
                    style={{
                      marginTop: "0.75rem",
                      display: "inline-block",
                      padding: "2px 10px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--color-surface-offset)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {album.category}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAlbums.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)" }}>
              No events found for this category.
            </div>
          )}
        </div>

        <style jsx>{`
          .albums-grid {
            grid-template-columns: 1fr;
          }
          @media (min-width: 640px) {
            .albums-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (min-width: 1024px) {
            .albums-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* Album Detail Modal/Lightbox */}
      {selectedAlbum && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setSelectedAlbum(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedAlbum(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2001,
            }}
          >
            <Icon name="x" size={24} color="white" />
          </button>

          <div onClick={(e) => e.stopPropagation()} style={{ textAlign: "center", maxWidth: "600px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                color: "white",
                marginBottom: "0.5rem",
              }}
            >
              {selectedAlbum.title}
            </h2>
            {selectedAlbum.subtitle && (
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
                {selectedAlbum.subtitle}
              </p>
            )}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginBottom: "2rem",
                fontSize: "var(--text-sm)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>{selectedAlbum.year}</span>
              <span>•</span>
              <span>{selectedAlbum.photoCount} {t(dict, "events.photos")}</span>
              <span>•</span>
              <span>{selectedAlbum.category}</span>
            </div>

            {/* Placeholder for actual images */}
            <div
              style={{
                aspectRatio: "16/9",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "var(--radius-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.1)",
                maxWidth: "100%",
              }}
            >
              <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
                <Icon name="camera" size={48} color="rgba(255,255,255,0.2)" />
                <p style={{ marginTop: "1rem", fontSize: "var(--text-sm)" }}>
                  Album photos will be displayed here
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAlbum(null)}
              className="btn btn-ghost-white"
              style={{ marginTop: "2rem" }}
            >
              {t(dict, "events.backToGallery")}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
