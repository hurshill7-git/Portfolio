import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card for the whole site (pages can override).
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
          background: "#100f0a",
          color: "#f4f2ec",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#908e80",
          }}
        >
          {`${site.role} · ${site.location}`}
        </div>
        <div style={{ display: "flex", fontSize: 82, lineHeight: 1.05, maxWidth: 900 }}>
          Designing clear, humane products people trust.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>{site.name}</span>
          <span style={{ color: "#d9442a" }}>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
