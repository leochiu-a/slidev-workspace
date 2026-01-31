import type { FC } from "react";
import {
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { colors, layout, typography } from "../theme/tokens";
import { titleFont } from "../theme/fonts";

const verbs = ["organize", "preview", "build", "publish"];
const maxVerbLength = Math.max(...verbs.map((verb) => verb.length));

export const Flow: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepFrames = Math.round(1.1 * fps);
  const transitionFrames = Math.max(6, Math.round(0.22 * fps));
  const stepIndex = Math.min(Math.floor(frame / stepFrames), verbs.length - 1);
  const nextIndex = Math.min(stepIndex + 1, verbs.length - 1);
  const localFrame = frame - stepIndex * stepFrames;
  const inTransition =
    stepIndex < verbs.length - 1 && localFrame > stepFrames - transitionFrames;
  const transitionProgress = interpolate(
    localFrame,
    [stepFrames - transitionFrames, stepFrames],
    [0, 1],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const currentY = interpolate(transitionProgress, [0, 1], [0, -22]);
  const nextY = interpolate(transitionProgress, [0, 1], [22, 0]);
  const currentOpacity = interpolate(transitionProgress, [0, 1], [1, 0]);
  const nextOpacity = interpolate(transitionProgress, [0, 1], [0, 1]);
  const entrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const entranceOpacity = interpolate(entrance, [0, 1], [0, 1]);
  const entranceY = interpolate(entrance, [0, 1], [18, 0]);
  const whooshFrames = verbs
    .slice(0, -1)
    .map((_, index) => (index + 1) * stepFrames - transitionFrames);

  return (
    <BackgroundFrame
      style={{
        padding: layout.paddingY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {whooshFrames.map((startFrame) => (
        <Sequence key={`whoosh-${startFrame}`} from={startFrame}>
          <Audio src={staticFile("whoosh.mp3")} volume={0.35} />
        </Sequence>
      ))}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: titleFont.fontFamily,
            fontSize: typography.subtitleSize,
            fontWeight: 600,
            color: colors.textStrong,
            textAlign: "center",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
            opacity: entranceOpacity,
            transform: `translateY(${entranceY}px)`,
          }}
        >
          Using slidev-workspace to{" "}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: `${maxVerbLength + 1}ch`,
              minHeight: 64,
              padding: "10px 18px",
              borderRadius: 12,
              border: `2px solid ${colors.borderStrong}`,
              backgroundColor: colors.cardWarm,
              position: "relative",
              overflow: "hidden",
              verticalAlign: "middle",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateY(${inTransition ? currentY : 0}px)`,
                opacity: inTransition ? currentOpacity : 1,
              }}
            >
              {verbs[stepIndex]}
            </span>
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateY(${inTransition ? nextY : 18}px)`,
                opacity: inTransition ? nextOpacity : 0,
              }}
            >
              {verbs[nextIndex]}
            </span>
          </span>{" "}
          your decks.
        </div>
      </div>
    </BackgroundFrame>
  );
};
