import type { FC } from "react";
import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { titleFont } from "../theme/fonts";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, layout, shadow, typography } from "../theme/tokens";

const animationDurationMs = 4000;

export const AnimeShowcase: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) {
      return;
    }

    const timeline = createTimeline({
      autoplay: false,
      defaults: {
        ease: "inOutQuad",
      },
    });

    timeline
      .add(dotRef.current, {
        translateX: 360,
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: animationDurationMs,
      })
      .add(
        ringRef.current,
        {
          scale: [0.7, 1.2],
          opacity: [0, 1],
          duration: animationDurationMs,
        },
        0,
      );

    animationRef.current = timeline;

    return () => {
      animationRef.current?.pause();
      animationRef.current = null;
    };
  }, []);

  const elapsedMs = (frame / fps) * 1000;
  const seekMs = Math.min(elapsedMs, animationDurationMs);

  useEffect(() => {
    animationRef.current?.seek(seekMs);
  }, [seekMs]);

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
          marginBottom: 18,
          color: colors.textStrong,
        }}
      >
        anime.js synced to Remotion frames
      </div>
      <FlowLine width={520} thickness={6} delayMs={150} />
      <div
        style={{
          width: 860,
          height: 180,
          borderRadius: 28,
          backgroundColor: colors.card,
          border: `1px solid ${colors.borderStrong}`,
          boxShadow: shadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          marginTop: 36,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 6,
            backgroundColor: colors.border,
            borderRadius: 999,
          }}
        />
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: `2px dashed ${colors.secondary}`,
            opacity: 0,
          }}
        />
        <div
          ref={dotRef}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: colors.primary,
            boxShadow: "0 0 18px rgba(255, 183, 3, 0.5)",
            opacity: 0,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 24,
          fontFamily: titleFont.fontFamily,
          fontSize: 24,
          color: colors.muted,
        }}
      >
        Timeline is driven by useCurrentFrame().
      </div>
    </BackgroundFrame>
  );
};
