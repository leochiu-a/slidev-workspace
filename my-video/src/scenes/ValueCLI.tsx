import type { FC } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TypewriterText } from "../components/TypewriterText";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, layout, shadow, typography } from "../theme/tokens";
import { titleFont } from "../theme/fonts";

export const ValueCLI: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statusOpacity = interpolate(frame, [1.6 * fps, 2.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <BackgroundFrame
      style={{
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
          color: colors.textStrong,
        }}
      >
        Build all slides with one command
      </div>
      <FlowLine width={520} thickness={6} delayMs={120} />
      <div
        style={{
          width: 980,
          height: 180,
          borderRadius: 20,
          backgroundColor: colors.card,
          border: `1px solid ${colors.borderStrong}`,
          boxShadow: shadow,
          padding: 26,
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: 32,
          color: colors.textStrong,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 16,
          marginTop: 32,
        }}
      >
        <TypewriterText text="pnpm slidev-workspace build" charsPerSecond={26} />
        <div style={{ fontSize: 26, color: colors.muted, opacity: statusOpacity }}>
          ✔ all slides built
        </div>
      </div>
    </BackgroundFrame>
  );
};
