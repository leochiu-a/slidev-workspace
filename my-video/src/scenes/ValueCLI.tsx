import type { FC } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TypewriterText } from "../components/TypewriterText";
import { colors, layout, shadow, typography } from "../theme/tokens";
import { bodyFont, titleFont } from "../theme/fonts";

export const ValueCLI: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const helperOpacity = interpolate(frame, [0.9 * fps, 1.4 * fps], [0, 1], {
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
      }}
    >
      <div
        style={{
          fontFamily: titleFont.fontFamily,
          fontSize: typography.subtitleSize,
          fontWeight: 600,
          marginBottom: 30,
        }}
      >
        Manage decks from your terminal
      </div>
      <div
        style={{
          width: 980,
          height: 180,
          borderRadius: 20,
          backgroundColor: "#0F172A",
          border: `1px solid ${colors.border}`,
          boxShadow: shadow,
          padding: 26,
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: 34,
          color: colors.primary,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TypewriterText text="slidev-workspace sync" charsPerSecond={24} />
      </div>
      <div
        style={{
          marginTop: 24,
          fontFamily: bodyFont.fontFamily,
          fontSize: typography.captionSize,
          color: colors.muted,
          opacity: helperOpacity,
        }}
      >
        Create, sync, publish — in seconds.
      </div>
    </AbsoluteFill>
  );
};
