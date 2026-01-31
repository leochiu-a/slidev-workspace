import type { FC } from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { colors, layout, shadow } from "../theme/tokens";

type ValueUIPreviewProps = {
  exitStartFrames?: number;
  exitEndFrames?: number;
};

export const ValueUIPreview: FC<ValueUIPreviewProps> = ({
  exitStartFrames,
  exitEndFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const browserOpacity = interpolate(browserEntrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const browserScale = interpolate(browserEntrance, [0, 1], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const previewGlow = interpolate(frame, [0.3 * fps, 1.1 * fps], [0, 0.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitStart = exitStartFrames ?? Math.round(2.2 * fps);
  const exitEnd = exitEndFrames ?? Math.round(2.9 * fps);
  const previewExitProgress = interpolate(frame, [exitStart, exitEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const previewExitOpacity = interpolate(previewExitProgress, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const previewExitLift = interpolate(previewExitProgress, [0, 1], [0, -48], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <BackgroundFrame
      style={{
        padding: layout.paddingY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 1280,
          height: 720,
        }}
      >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 28,
              backgroundColor: "#FFFDF8",
              border: `1px solid ${colors.border}`,
              boxShadow: shadow,
              overflow: "hidden",
              opacity: browserOpacity * previewExitOpacity,
              transform: `translateY(${previewExitLift}px) scale(${browserScale})`,
              position: "relative",
          }}
        >
          <div
            style={{
              height: 64,
              backgroundColor: "#FFF6D8",
              borderBottom: `1px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#FF5F57",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.25) inset",
                }}
              />
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#FEBB2E",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.25) inset",
                }}
              />
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#28C840",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.25) inset",
                }}
              />
            </div>
            <div
              style={{
                marginLeft: 18,
                height: 34,
                flex: 1,
                borderRadius: 12,
                backgroundColor: "#FFF1C6",
                border: `1px solid ${colors.border}`,
              }}
            />
          </div>
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFF6D8",
              padding: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                opacity: previewGlow,
                pointerEvents: "none",
              }}
            />
              <Img
                src={staticFile("image.png")}
                alt="Slidev Workspace UI screenshot"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 0,
                  border: "none",
                }}
              />
          </div>
        </div>
      </div>
    </BackgroundFrame>
  );
};
