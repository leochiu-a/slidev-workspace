import type { FC } from "react";
import { Sequence, useVideoConfig } from "remotion";
import { CTA } from "./scenes/CTA";
import { Flow } from "./scenes/Flow";
import { Results } from "./scenes/Results";
import { ValueCLI } from "./scenes/ValueCLI";
import { ValueOrganize } from "./scenes/ValueOrganize";
import { ValueUICli } from "./scenes/ValueUICli";
import { ValueUIPreview } from "./scenes/ValueUIPreview";
import { ValueUITitle } from "./scenes/ValueUITitle";
import { BackgroundFrame } from "./components/BackgroundFrame";

export const Promo30: FC = () => {
  const { fps } = useVideoConfig();
  const flowDurationFrames = Math.round(4.4 * fps);
  const valueUiStartFrames = 5 * fps + flowDurationFrames;
  const valueUiMinimumFrames = 5 * fps;
  const cliDurationFrames = Math.round(3.6 * fps);
  const cliFlipEndFrames = Math.max(cliDurationFrames - Math.round(0.5 * fps), Math.round(1.9 * fps));
  const titleDurationFrames = Math.round(1.8 * fps);
  const titleStartOffsetFrames = Math.max(cliFlipEndFrames - Math.round(0.4 * fps), 0);
  const previewMinimumFrames = Math.round(1.6 * fps);
  const previewStartOffsetFrames = titleStartOffsetFrames + titleDurationFrames;
  const previewDurationFrames = Math.max(
    previewMinimumFrames,
    valueUiMinimumFrames - previewStartOffsetFrames
  );
  const valueUiTotalFrames = Math.max(
    valueUiMinimumFrames,
    cliDurationFrames,
    previewStartOffsetFrames + previewDurationFrames
  );
  const previewExitStartFrames = Math.max(previewDurationFrames - Math.round(0.8 * fps), 0);
  const previewExitEndFrames = Math.max(previewDurationFrames - Math.round(0.1 * fps), 0);

  // Visual timing is verified in Remotion Studio; no automated tests are set up for motion sequencing.
  return (
    <BackgroundFrame>
      <Sequence from={0} durationInFrames={5 * fps} premountFor={1 * fps}>
        <ValueOrganize />
      </Sequence>
      <Sequence
        from={5 * fps}
        durationInFrames={flowDurationFrames}
        premountFor={1 * fps}
      >
        <Flow />
      </Sequence>
      <Sequence
        from={valueUiStartFrames}
        durationInFrames={cliDurationFrames}
        premountFor={1 * fps}
      >
        <ValueUICli exitEndFrames={cliFlipEndFrames} durationFrames={cliDurationFrames} />
      </Sequence>
      <Sequence
        from={valueUiStartFrames + titleStartOffsetFrames}
        durationInFrames={titleDurationFrames}
        premountFor={1 * fps}
      >
        <ValueUITitle />
      </Sequence>
      <Sequence
        from={valueUiStartFrames + previewStartOffsetFrames}
        durationInFrames={previewDurationFrames}
        premountFor={1 * fps}
      >
        <ValueUIPreview
          exitStartFrames={previewExitStartFrames}
          exitEndFrames={previewExitEndFrames}
        />
      </Sequence>
      <Sequence
        from={valueUiStartFrames + valueUiTotalFrames}
        durationInFrames={5 * fps}
        premountFor={1 * fps}
      >
        <ValueCLI />
      </Sequence>
      <Sequence from={20 * fps} durationInFrames={6 * fps} premountFor={1 * fps}>
        <Results />
      </Sequence>
      <Sequence from={26 * fps} durationInFrames={4 * fps} premountFor={1 * fps}>
        <CTA />
      </Sequence>
    </BackgroundFrame>
  );
};
