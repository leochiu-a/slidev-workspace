import type { FC } from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TypewriterText } from "./TypewriterText";

type PreviewCliTerminalProps = {
  exitEnd: number;
  durationFrames: number;
};

export const PreviewCliTerminal: FC<PreviewCliTerminalProps> = ({ exitEnd, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const commandEntrance = spring({
    frame: frame - 0.2 * fps,
    fps,
    config: { damping: 200 },
  });
  const commandOpacityIn = interpolate(commandEntrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const commandScale = interpolate(commandEntrance, [0, 1], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const entranceProgress = interpolate(frame, [0.1 * fps, 0.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const entranceLift = interpolate(entranceProgress, [0, 1], [220, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitProgress = interpolate(frame, [exitEnd - 1.0 * fps, exitEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const exitCoverRotateX = interpolate(exitProgress, [0, 1], [0, -90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitCoverLift = interpolate(exitProgress, [0, 1], [0, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const terminalRotateY = interpolate(frame, [0.2 * fps, durationFrames], [-10, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "64%",
        transform: `translate(-50%, -50%) translateY(${entranceLift + exitCoverLift}px) scale(${commandScale}) rotateX(${-8 + exitCoverRotateX}deg) rotateY(${terminalRotateY}deg)`,
        transformStyle: "preserve-3d",
        transformOrigin: "center bottom",
        width: 1200,
        height: 980,
        borderRadius: 20,
        backgroundColor: "#0F172A",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 24px 50px rgba(15, 23, 42, 0.35)",
        padding: 28,
        paddingTop: 64,
        fontFamily:
          "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: 34,
        color: "#E2E8F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 14,
        opacity: commandOpacityIn,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "absolute",
          top: 16,
          left: 18,
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#FF5F57",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
          }}
        />
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#FEBB2E",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
          }}
        />
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#28C840",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "#34D399" }}>$</span>
        <TypewriterText text="pnpm slidev-workspace preview" charsPerSecond={26} />
      </div>
    </div>
  );
};
