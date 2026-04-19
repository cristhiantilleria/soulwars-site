import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Soul Wars Community Wiki";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0d1018 0%, #111827 50%, #1a0a0a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(231,76,60,0.12) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Top kanji */}
        <div style={{ fontSize: "64px", color: "rgba(231,76,60,0.5)", marginBottom: "8px" }}>
          魂
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.04em",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Soul Wars
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#d4af37",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "12px",
          }}
        >
          Community Wiki
        </div>

        {/* Divider */}
        <div
          style={{
            width: "320px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
            margin: "24px 0",
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "#7a8aaa",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Skill trees · Builds · Perks · Factions
        </div>

        {/* Version badge */}
        <div
          style={{
            marginTop: "28px",
            padding: "8px 24px",
            border: "1px solid rgba(212,175,55,0.4)",
            borderRadius: "4px",
            color: "#d4af37",
            fontSize: "16px",
            letterSpacing: "0.1em",
          }}
        >
          VERSION 3.0 — APRIL 2026 WIPE
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "14px",
            color: "rgba(122,138,170,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          discord.gg/9T5gPBe · Made by Pipe
        </div>
      </div>
    ),
    { ...size }
  );
}
