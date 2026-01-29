import type { FC } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, layout, typography } from "../theme/tokens";
import { bodyFont, titleFont } from "../theme/fonts";

export const CTA: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(entrance, [0, 1], [0.98, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sweepX = interpolate(frame, [0, 2.2 * fps], [-400, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        padding: layout.paddingY,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "70px 140px",
          borderRadius: 36,
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          transform: `scale(${scale})`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: `translateX(${sweepX}px)`,
            width: 320,
            height: "100%",
            background: "linear-gradient(120deg, transparent, rgba(88, 225, 193, 0.2), transparent)",
          }}
        />
        <div
          style={{
            position: "relative",
            fontFamily: titleFont.fontFamily,
            fontSize: typography.subtitleSize,
            fontWeight: 700,
          }}
        >
          Start organizing today
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 16,
            fontFamily: bodyFont.fontFamily,
            fontSize: typography.captionSize,
            color: colors.muted,
          }}
        >
          slidev-workspace
        </div>
      </div>
    </AbsoluteFill>
  );
};
