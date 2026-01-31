import type { FC } from "react";
import { useEffect, useMemo, useRef } from "react";
import { createTimeline } from "animejs";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme/tokens";

export type FlowLineProps = {
  width?: number;
  thickness?: number;
  delayMs?: number;
  durationMs?: number;
  accentColor?: string;
};

export const FlowLine: FC<FlowLineProps> = ({
  width = 560,
  thickness = 6,
  delayMs = 0,
  durationMs = 900,
  accentColor = colors.secondary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  useEffect(() => {
    if (!lineRef.current || !glowRef.current) {
      return;
    }

    const timeline = createTimeline({
      autoplay: false,
      defaults: {
        ease: "inOutCubic",
      },
    });

    timeline.add(lineRef.current, {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: durationMs,
    });

    timeline.add(
      glowRef.current,
      {
        scaleX: [0.6, 1],
        opacity: [0, 0.55],
        duration: durationMs,
      },
      0,
    );

    timelineRef.current = timeline;

    return () => {
      timelineRef.current?.pause();
      timelineRef.current = null;
    };
  }, [durationMs]);

  const elapsedMs = useMemo(() => (frame / fps) * 1000, [frame, fps]);
  const seekMs = Math.min(Math.max(0, elapsedMs - delayMs), durationMs);

  useEffect(() => {
    timelineRef.current?.seek(seekMs);
  }, [seekMs]);

  return (
    <div
      style={{
        position: "relative",
        width,
        height: thickness,
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: 999,
          background: `radial-gradient(circle, ${accentColor}66 0%, transparent 70%)`,
          opacity: 0,
          transformOrigin: "left center",
          filter: "blur(6px)",
        }}
      />
      <div
        ref={lineRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 999,
          background: `linear-gradient(90deg, ${accentColor}, ${colors.primary})`,
          transformOrigin: "left center",
          opacity: 0,
        }}
      />
    </div>
  );
};
