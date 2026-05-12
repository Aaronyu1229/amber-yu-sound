import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dolce & Forte — Premium Game Audio Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(184,134,11,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(102,73,177,0.18) 0%, transparent 55%), #0a0a0a",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: "8px",
              textTransform: "uppercase",
              color: "#b8860b",
              fontWeight: 500,
            }}
          >
            Premium Game Audio Studio
          </span>
          <span
            style={{
              fontSize: 128,
              lineHeight: 1,
              fontWeight: 700,
              color: "#f7f6f1",
              letterSpacing: "-2px",
              textAlign: "center",
            }}
          >
            Dolce <span style={{ color: "#b8860b", fontStyle: "italic" }}>&amp;</span> Forte
          </span>
          <span
            style={{
              fontSize: 26,
              color: "rgba(247,246,241,0.7)",
              textAlign: "center",
              maxWidth: 900,
              lineHeight: 1.4,
              marginTop: 12,
            }}
          >
            Audio that keeps players spinning.
            <br />
            Slot games · Live casino · iGaming
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(247,246,241,0.45)",
          }}
        >
          dolcenforte.com
        </div>
      </div>
    ),
    { ...size },
  );
}
