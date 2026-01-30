import type { FC } from "react";
import { useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { PreviewCliTerminal } from "../components/PreviewCliTerminal";
import { layout } from "../theme/tokens";

type ValueUICliProps = {
  exitEndFrames?: number;
  durationFrames?: number;
};

export const ValueUICli: FC<ValueUICliProps> = ({ exitEndFrames, durationFrames }) => {
  const { fps } = useVideoConfig();
  const cliExitEnd = exitEndFrames ?? Math.round(1.9 * fps);
  const cliDuration = durationFrames ?? Math.round(3 * fps);

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
        <PreviewCliTerminal exitEnd={cliExitEnd} durationFrames={cliDuration} />
      </div>
    </BackgroundFrame>
  );
};
