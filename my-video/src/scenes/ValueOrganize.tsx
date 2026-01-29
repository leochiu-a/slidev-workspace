import type { FC } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, layout, typography } from "../theme/tokens";
import { bodyFont, titleFont } from "../theme/fonts";
import { MockCard } from "../components/MockCard";

const cards = [
  {
    title: "deck-final.md",
    subtitle: "Marketing",
    messy: { x: -360, y: -140, rotate: -8 },
    grid: { x: -396, y: -150 },
  },
  {
    title: "deck-final-v2.md",
    subtitle: "Product",
    messy: { x: -40, y: -220, rotate: 6 },
    grid: { x: 0, y: -150 },
  },
  {
    title: "deck-final-v2-real.md",
    subtitle: "All Hands",
    messy: { x: 360, y: -80, rotate: -4 },
    grid: { x: 396, y: -150 },
  },
  {
    title: "roadmap-q3.md",
    subtitle: "Roadmap",
    messy: { x: -420, y: 120, rotate: 10 },
    grid: { x: -396, y: 150 },
  },
  {
    title: "team-sync.md",
    subtitle: "Ops",
    messy: { x: 40, y: 190, rotate: -6 },
    grid: { x: 0, y: 150 },
  },
  {
    title: "launch-plan.md",
    subtitle: "Launch",
    messy: { x: 420, y: 120, rotate: 4 },
    grid: { x: 396, y: 150 },
  },
];

export const ValueOrganize: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const organizeProgress = interpolate(frame, [0.6 * fps, 2.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        padding: layout.paddingY,
      }}
    >
      <div
        style={{
          fontFamily: titleFont.fontFamily,
          fontSize: typography.subtitleSize,
          fontWeight: 600,
          marginBottom: 36,
          opacity: textOpacity,
        }}
      >
        Organize Slidev decks in seconds
      </div>
      <div style={{ display: "flex", gap: 36 }}>
        <div
          style={{
            width: 260,
            borderRadius: 22,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.card,
            padding: 22,
            height: 520,
            boxSizing: "border-box",
            opacity: organizeProgress,
          }}
        >
          <div
            style={{
              fontFamily: titleFont.fontFamily,
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            Workspace
          </div>
          {["All decks", "Marketing", "Product", "Roadmap", "All Hands"].map((label) => (
            <div
              key={label}
              style={{
                fontFamily: bodyFont.fontFamily,
                fontSize: 20,
                color: colors.muted,
                padding: "10px 12px",
                borderRadius: 12,
                backgroundColor: label === "All decks" ? "rgba(110, 168, 254, 0.12)" : "transparent",
                marginBottom: 8,
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div style={{ position: "relative", height: 520, flex: 1 }}>
          {cards.map((card, index) => {
            const entrance = spring({
              frame: frame - index * 6,
              fps,
              config: { damping: 200 },
            });
            const x = interpolate(entrance, [0, 1], [card.messy.x + 120, card.messy.x], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y = interpolate(entrance, [0, 1], [card.messy.y + 80, card.messy.y], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const organizedX = interpolate(organizeProgress, [0, 1], [x, card.grid.x], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const organizedY = interpolate(organizeProgress, [0, 1], [y, card.grid.y], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const rotate = interpolate(organizeProgress, [0, 1], [card.messy.rotate, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={card.title}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(${organizedX}px, ${organizedY}px) rotate(${rotate}deg)`,
                }}
              >
                <MockCard title={card.title} subtitle={card.subtitle} highlight={index === 0} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          fontFamily: bodyFont.fontFamily,
          fontSize: typography.captionSize,
          color: colors.muted,
          marginTop: 18,
        }}
      >
        Centralize decks, tags, and owners in one place.
      </div>
    </AbsoluteFill>
  );
};
