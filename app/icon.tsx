import { ImageResponse } from "next/og";

// Favicon — the "H." brand mark (cream serif H + red accent dot on near-black),
// matching the nav wordmark and OG image. Generated at build time.
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
          background: "transparent",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#100f0a",
            color: "#f4f2ec",
            fontFamily: "Georgia, serif",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.5 }}>H</span>
          <span
            style={{
              width: 4,
              height: 4,
              marginLeft: 1,
              marginBottom: 8,
              borderRadius: "50%",
              background: "#d9442a",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
