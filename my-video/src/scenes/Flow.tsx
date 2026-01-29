import type { FC } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, layout, shadow, typography } from "../theme/tokens";
import { titleFont } from "../theme/fonts";

const steps = ["Create", "Organize", "Share"];

export const Flow: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        padding: layout.paddingY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: titleFont.fontFamily,
          fontSize: typography.subtitleSize,
          fontWeight: 600,
          marginBottom: 50,
        }}
      >
        Create → Organize → Share
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {steps.map((step, index) => {
          const entrance = spring({
            frame: frame - index * 10,
            fps,
            config: { damping: 200 },
          });
          const opacity = interpolate(entrance, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const scale = interpolate(entrance, [0, 1], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const glow = interpolate(entrance, [0.4, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <div
                style={{
                  width: 240,
                  height: 140,
                  borderRadius: 24,
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.border}`,
                  boxShadow: shadow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: titleFont.fontFamily,
                  fontSize: 34,
                  fontWeight: 600,
                  opacity,
                  transform: `scale(${scale})`,
                  position: "relative",
                }}
              >
                {step}
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: 28,
                    border: `1px solid rgba(88, 225, 193, ${0.4 * glow})`,
                  }}
                />
              </div>
              {index < steps.length - 1 ? (
                <div
                  style={{
                    width: 80,
                    height: 4,
                    borderRadius: 999,
                    backgroundColor: colors.secondary,
                    opacity: glow,
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
