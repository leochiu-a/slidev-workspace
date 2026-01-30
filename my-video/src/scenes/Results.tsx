import type { FC } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
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
    <BackgroundFrame
      style={{
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
          marginBottom: 14,
          color: colors.textStrong,
        }}
      >
        Everything in one workspace
      </div>
      <FlowLine width={520} thickness={6} delayMs={120} />
      <div style={{ position: "relative", width: 420, height: 260, marginTop: 32 }}>
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
              <div style={{ position: "relative", width: 360, height: 220 }}>
                <MockCard title={card.title} highlight={index === 1} />
                <div
                  style={{
                    position: "absolute",
                    right: 18,
                    bottom: 18,
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.cardWarm,
                    fontSize: 16,
                    color: colors.muted,
                  }}
                >
                  GitHub Pages
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 18,
                    bottom: 18,
                    fontSize: 16,
                    color: colors.muted,
                  }}
                >
                  Published · Updated
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BackgroundFrame>
  );
};
