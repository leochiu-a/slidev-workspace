import type { FC } from "react";
import { useVideoConfig } from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { PreviewCliTerminal } from "../components/PreviewCliTerminal";
import { layout } from "../theme/tokens";

type ValueUICliProps = {
  durationFrames?: number;
};

export const ValueUICli: FC<ValueUICliProps> = ({ durationFrames }) => {
  const { fps } = useVideoConfig();
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
        <PreviewCliTerminal
          durationFrames={cliDuration}
          commandText="pnpm slidev-workspace preview"
          statusOpacity={1}
        />
      </div>
    </BackgroundFrame>
  );
};
