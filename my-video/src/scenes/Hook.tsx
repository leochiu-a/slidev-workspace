import type { FC } from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, layout, shadow, typography } from "../theme/tokens";
import { titleFont } from "../theme/fonts";

const cardPositions = [
  { x: -220, y: -120, rotate: -8, label: "deck-final.md" },
  { x: 0, y: -40, rotate: 3, label: "deck-final-v2.md" },
  { x: 220, y: 60, rotate: -4, label: "deck-final-v2-real.md" },
];

export const Hook: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const settleFrame = 22;
  const textOpacity = interpolate(frame, [20, 34], [0, 1], {
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
      <div
        style={{
          position: "relative",
          width: 720,
          height: 440,
          margin: "0 auto",
        }}
      >
        {cardPositions.map((card, index) => {
          const staggeredFrame = Math.max(0, frame - index * 6);
          const heldFrame = Math.min(staggeredFrame, settleFrame);
          const entrance = spring({
            frame: heldFrame,
            fps,
            config: { damping: 200 },
          });
          const spread = interpolate(entrance, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={card.x}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 420,
                height: 260,
                borderRadius: 24,
                backgroundColor: colors.card,
                border: `1px solid ${colors.borderStrong}`,
                boxShadow: shadow,
                transform: `translate(-50%, -50%) translate(${card.x * spread}px, ${card.y * spread}px) rotate(${card.rotate * spread}deg) scale(${0.9 + 0.1 * spread})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <Img
                src={staticFile("slidev-logo.png")}
                alt="Slidev logo"
                style={{
                  width: 260,
                  height: 140,
                  objectFit: "contain",
                  opacity: 0.98,
                }}
              />
              <div
                style={{
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  fontSize: 20,
                  color: colors.muted,
                }}
              >
                {card.label}
              </div>
            </div>
          );
        })}
      </div>
      <FlowLine width={420} thickness={6} delayMs={150} />
      <div
        style={{
          marginTop: 40,
          fontFamily: titleFont.fontFamily,
          fontSize: typography.titleSize,
          fontWeight: 600,
          opacity: textOpacity,
          textAlign: "center",
          color: colors.textStrong,
        }}
      >
        Where is that Slidev deck?
      </div>
    </BackgroundFrame>
  );
};
