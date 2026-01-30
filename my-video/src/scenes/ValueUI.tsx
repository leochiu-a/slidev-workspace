import type { FC } from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, layout, shadow, typography } from "../theme/tokens";
import { bodyFont } from "../theme/fonts";

export const ValueUI: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserEntrance = spring({
    frame: frame - 8,
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

  const commandOpacity = interpolate(frame, [0.7 * fps, 1.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const previewGlow = interpolate(frame, [0.9 * fps, 1.6 * fps], [0, 0.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <BackgroundFrame
      style={{
        padding: layout.paddingY,
      }}
    >
      <div
        style={{
          fontFamily: bodyFont.fontFamily,
          fontSize: typography.captionSize,
          color: colors.textStrong,
          marginBottom: 12,
        }}
      >
        Preview all slides in one place
      </div>
      <FlowLine width={460} thickness={6} delayMs={150} />

      <div
        style={{
          width: 1280,
          height: 720,
          borderRadius: 28,
          backgroundColor: colors.card,
          border: `1px solid ${colors.borderStrong}`,
          boxShadow: shadow,
          overflow: "hidden",
          opacity: browserOpacity,
          transform: `scale(${browserScale})`,
          position: "relative",
          marginTop: 28,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 24,
            padding: "6px 12px",
            borderRadius: 999,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.cardWarm,
            fontFamily:
              "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: 16,
            color: colors.muted,
            opacity: commandOpacity,
            zIndex: 2,
          }}
        >
          pnpm slidev-workspace preview
        </div>
        <div
          style={{
            height: 64,
            backgroundColor: colors.cardWarm,
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
            padding: 48,
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
              objectFit: "contain",
              borderRadius: 18,
              border: "1px solid rgba(210, 169, 82, 0.35)",
            }}
          />
        </div>
      </div>
    </BackgroundFrame>
  );
};
