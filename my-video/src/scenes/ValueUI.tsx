import type { FC } from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, layout, shadow, typography } from "../theme/tokens";
import { titleFont } from "../theme/fonts";

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

  const labelOpacity = interpolate(frame, [0.6 * fps, 1.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        padding: layout.paddingY,
      }}
    >
      <div
        style={{
          fontFamily: titleFont.fontFamily,
        fontSize: typography.subtitleSize,
        fontWeight: 600,
        marginBottom: 24,
      }}
    >
        Clean, modern UI for management
      </div>

      <div
        style={{
          width: 1280,
          height: 720,
          borderRadius: 28,
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: shadow,
          overflow: "hidden",
          opacity: browserOpacity,
          transform: `scale(${browserScale})`,
        }}
      >
        <div
          style={{
            height: 64,
            backgroundColor: "#0F172A",
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
              backgroundColor: "#111827",
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
            backgroundColor: "#0B1220",
            padding: 48,
            position: "relative",
          }}
        >
          <Img
            src={staticFile("image.png")}
            alt="Slidev Workspace UI screenshot"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: 18,
              border: "1px solid rgba(148,163,184,0.2)",
            }}
          />
          {[
            { label: "Owner", x: 80, y: 70 },
            { label: "Status", x: 260, y: 70 },
            { label: "Last updated", x: 470, y: 70 },
          ].map((chip) => (
            <div
              key={chip.label}
              style={{
                position: "absolute",
                top: chip.y,
                left: chip.x,
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                border: `1px solid ${colors.border}`,
                fontFamily: titleFont.fontFamily,
                fontSize: 18,
                color: colors.muted,
                opacity: labelOpacity,
              }}
            >
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
