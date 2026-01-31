import type { FC } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { PreviewCliTerminal } from "../components/PreviewCliTerminal";
import { layout } from "../theme/tokens";

type ValueCLICliProps = {
  durationFrames?: number;
};

export const ValueCLICli: FC<ValueCLICliProps> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cliDuration = durationFrames ?? Math.round(3.2 * fps);

  const statusOpacity = interpolate(frame, [1.6 * fps, 2.2 * fps], [0, 1], {
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
          width: 1280,
          height: 720,
          perspective: 1600,
        }}
      >
        <PreviewCliTerminal
          durationFrames={cliDuration}
          commandText="pnpm slidev-workspace build"
          statusText="✔ all slides built"
          statusOpacity={statusOpacity}
        />
      </div>
    </BackgroundFrame>
  );
};
