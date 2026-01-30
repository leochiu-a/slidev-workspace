import type { FC } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TypewriterText } from "../components/TypewriterText";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, layout, typography } from "../theme/tokens";
import { bodyFont, titleFont } from "../theme/fonts";

export const Title: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleText = "Slidev Workspace";
  const titleCharsPerSecond = 18;
  const subtitleStart = Math.round(((0.7 * titleText.length) / titleCharsPerSecond) * fps);
  const subtitleEnd = subtitleStart + Math.round(0.6 * fps);
  const subtitleOpacity = interpolate(frame, [subtitleStart, subtitleEnd], [0, 1], {
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
          fontFamily: titleFont.fontFamily,
          fontSize: typography.titleSize,
          fontWeight: 700,
          letterSpacing: -1,
          color: colors.textStrong,
        }}
      >
        <TypewriterText text={titleText} charsPerSecond={titleCharsPerSecond} />
      </div>
      <div style={{ marginTop: 22 }}>
        <FlowLine width={320} thickness={6} delayMs={180} />
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: bodyFont.fontFamily,
          fontSize: typography.subtitleSize,
          color: colors.muted,
          opacity: subtitleOpacity,
        }}
      >
        All your Slidev decks, organized.
      </div>
    </BackgroundFrame>
  );
};
