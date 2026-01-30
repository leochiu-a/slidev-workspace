import type { FC } from "react";
import { Sequence, useVideoConfig } from "remotion";
import { CTA } from "./scenes/CTA";
import { Flow } from "./scenes/Flow";
import { ValueCLICli } from "./scenes/ValueCLICli";
import { ValueCLITitle } from "./scenes/ValueCLITitle";
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
  const titleDurationFrames = Math.round(1.8 * fps);
  const previewMinimumFrames = Math.round(2.4 * fps);
  const previewStartOffsetFrames = cliDurationFrames + titleDurationFrames;
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
  const buildStartFrames = valueUiStartFrames + valueUiTotalFrames;
  const buildDurationFrames = 5 * fps;
  const buildCliDurationFrames = Math.round(3.2 * fps);
  const buildTitleDurationFrames = Math.max(buildDurationFrames - buildCliDurationFrames, 0);
  const ctaStartFrames = buildStartFrames + buildDurationFrames;
  const ctaDurationFrames = 4 * fps;

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
        <ValueUICli durationFrames={cliDurationFrames} />
      </Sequence>
      <Sequence
        from={valueUiStartFrames + cliDurationFrames}
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
        from={buildStartFrames}
        durationInFrames={buildCliDurationFrames}
        premountFor={1 * fps}
      >
        <ValueCLICli durationFrames={buildCliDurationFrames} />
      </Sequence>
      <Sequence
        from={buildStartFrames + buildCliDurationFrames}
        durationInFrames={buildTitleDurationFrames}
        premountFor={1 * fps}
      >
        <ValueCLITitle />
      </Sequence>
      <Sequence
        from={ctaStartFrames}
        durationInFrames={ctaDurationFrames}
        premountFor={1 * fps}
      >
        <CTA />
      </Sequence>
    </BackgroundFrame>
  );
};
