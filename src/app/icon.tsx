import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";
import { getInitials, themeColors as c } from "@/lib/utils";

// Browser-tab icon: your initials, matching the navbar logo.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          border: `2px solid ${c.accent}`,
          backgroundColor: c.background,
          color: c.accent,
          fontSize: 14,
        }}
      >
        {getInitials(profile.name)}
      </div>
    ),
    size,
  );
}
