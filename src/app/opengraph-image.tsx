import { ImageResponse } from "next/og";
import { hero, profile } from "@/lib/data";
import { getInitials, themeColors as c } from "@/lib/utils";

// The preview card shown when your link is shared (LinkedIn, Messenger, X, Slack...).
export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: c.foreground,
          backgroundColor: c.background,
          backgroundImage: `radial-gradient(circle at 85% 0%, ${c.accent}33, transparent 50%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              border: `2px solid ${c.accent}66`,
              backgroundColor: `${c.accent}1a`,
              color: c.accent,
              fontSize: 30,
            }}
          >
            {getInitials(profile.name)}
          </div>
          <div style={{ fontSize: 28, color: c.muted }}>{new URL(profile.siteUrl).host}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ fontSize: 56, color: c.muted, marginTop: 8 }}>{profile.title}</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {hero.stack.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: `1px solid ${c.border}`,
                backgroundColor: c.surface,
                fontSize: 24,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
