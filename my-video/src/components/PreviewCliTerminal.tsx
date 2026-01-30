import type { FC } from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TerminalCard } from "./TerminalCard";

type PreviewCliTerminalProps = {
  durationFrames: number;
  commandText: string;
  statusText?: string;
  statusOpacity?: number;
};

export const PreviewCliTerminal: FC<PreviewCliTerminalProps> = ({
  durationFrames,
  commandText,
  statusText,
  statusOpacity,
}) => {
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

  const exitProgress = interpolate(
    frame,
    [Math.max(durationFrames - 1.0 * fps, 0), durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
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
        opacity: commandOpacityIn,
      }}
    >
      <TerminalCard
        commandText={commandText}
        statusText={statusText}
        statusOpacity={statusOpacity}
        typingAudio
      />
    </div>
  );
};
