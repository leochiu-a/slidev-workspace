import type { FC } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MockCard } from "../components/MockCard";
import { colors, layout, typography } from "../theme/tokens";
import { titleFont } from "../theme/fonts";

const cards = [
  { title: "All Hands" },
  { title: "Product Updates" },
  { title: "Launch Plan" },
];

export const Results: FC = () => {
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
          marginBottom: 40,
        }}
      >
        Everything in one workspace
      </div>
      <div style={{ position: "relative", width: 420, height: 260 }}>
        {cards.map((card, index) => {
          const start = index * 0.9 * fps;
          const end = start + 0.9 * fps;
          const opacity = interpolate(frame, [start, start + 8, end - 8, end], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(frame, [start, end], [10, -10], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={card.title}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity,
                transform: `translateY(${y}px)`,
              }}
            >
              <MockCard title={card.title} highlight={index === 1} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
