import { ImageResponse } from "next/og";

export const alt = "Sarajevo Team Building: corporate events in Sarajevo";
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
          background: "linear-gradient(135deg, #171c27 0%, #2b3445 100%)",
          color: "#f6f5f2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#e6a46d" }}>
          SARAJEVO TEAM BUILDING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, display: "flex" }}>
            Team activities that make the most of
          </div>
          <div style={{ fontSize: 84, lineHeight: 1.05, display: "flex",           color: "#e6a46d" }}>
            Sarajevo.
          </div>
        </div>
                  <div style={{ display: "flex", fontSize: 28, color: "#9ea6b5" }}>
          Corporate team building · Run in English
        </div>
      </div>
    ),
    size,
  );
}
