import type { FC } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, layout, typography } from "../theme/tokens";
import { titleFont } from "../theme/fonts";

export const ValueUITitle: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(titleEntrance, [0, 1], [0.96, 1], {
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: titleFont.fontFamily,
            fontSize: 56,
            fontWeight: 600,
            color: colors.textStrong,
            marginBottom: 8,
            textAlign: "center",
            width: "100%",
            whiteSpace: "nowrap",
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          Preview all slides with one command
        </div>
        <FlowLine width={460} thickness={6} delayMs={150} />
      </div>
    </BackgroundFrame>
  );
};
