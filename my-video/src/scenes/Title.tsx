import type { FC } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TypewriterText } from "../components/TypewriterText";
import { colors, layout, typography } from "../theme/tokens";
import { bodyFont, titleFont } from "../theme/fonts";

export const Title: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const subtitleOpacity = interpolate(frame, [0.6 * fps, 1.2 * fps], [0, 1], {
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
          fontFamily: titleFont.fontFamily,
          fontSize: typography.titleSize,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        <TypewriterText text="Slidev Workspace" charsPerSecond={18} />
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: bodyFont.fontFamily,
          fontSize: typography.subtitleSize,
          color: colors.muted,
          opacity: subtitleOpacity,
        }}
      >
        All your Slidev decks, organized.
      </div>
    </AbsoluteFill>
  );
};
