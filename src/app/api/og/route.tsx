import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Module-level promise — fetched once per warm isolate, reused across all requests
const geistFontPromise: Promise<ArrayBuffer> = fetch(
  "https://fonts.gstatic.com/s/geist/v1/gyByhwUxId8gMEwcGFWNOITddY4.woff"
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "RYX Tech Blog";

  const geistFont = await geistFontPromise;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)",
          padding: "60px",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #0066FF, #00D9FF)",
          }}
        />

        {/* Logo / brand */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #0066FF, #00D9FF)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            R
          </div>
          <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em" }}>
            RYX Tech
          </span>
        </div>

        {/* Category label */}
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              background: "rgba(0, 102, 255, 0.15)",
              border: "1px solid rgba(0, 102, 255, 0.3)",
              color: "#60A5FA",
              fontSize: "13px",
              fontWeight: "600",
              padding: "4px 14px",
              borderRadius: "100px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Blog
          </span>
        </div>

        {/* Article title */}
        <div
          style={{
            color: "#ffffff",
            fontSize: title.length > 60 ? "36px" : "44px",
            fontWeight: "700",
            lineHeight: "1.2",
            letterSpacing: "-0.03em",
            maxWidth: "900px",
            marginBottom: "28px",
          }}
        >
          {title}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
            ryxtech.in/blog
          </span>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>
            Software Company · Coimbatore, India
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: geistFont,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
