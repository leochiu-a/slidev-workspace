import type { FC } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, gradients, layout, shadow, typography } from "../theme/tokens";
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
    <BackgroundFrame
      style={{
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
          border: `1px solid ${colors.borderStrong}`,
          transform: `scale(${scale})`,
          overflow: "hidden",
          boxShadow: shadow,
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
            background: gradients.cardGlow,
          }}
        />
        <div
          style={{
            position: "relative",
            fontFamily: titleFont.fontFamily,
            fontSize: typography.subtitleSize,
            fontWeight: 700,
            color: colors.textStrong,
          }}
        >
          Start organizing today
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <FlowLine width={220} thickness={5} delayMs={200} />
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
    </BackgroundFrame>
  );
};
