import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "128px",
          border: "24px solid #2563EB",
          position: "relative",
        }}
      >
        {/* Heart Icon representation */}
        <div
          style={{
            color: "#10B981",
            fontSize: "280px",
            fontFamily: "sans-serif",
            lineHeight: 1,
            marginTop: "-30px",
          }}
        >
          ♥
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
