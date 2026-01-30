import type { FC } from "react";
import { Sequence, useVideoConfig } from "remotion";
import { CTA } from "./scenes/CTA";
import { Flow } from "./scenes/Flow";
import { Results } from "./scenes/Results";
import { ValueCLI } from "./scenes/ValueCLI";
import { ValueOrganize } from "./scenes/ValueOrganize";
import { ValueUI } from "./scenes/ValueUI";
import { BackgroundFrame } from "./components/BackgroundFrame";

export const Promo30: FC = () => {
  const { fps } = useVideoConfig();

  // Visual timing is verified in Remotion Studio; no automated tests are set up for motion sequencing.
  return (
    <BackgroundFrame>
      <Sequence from={0} durationInFrames={5 * fps} premountFor={1 * fps}>
        <ValueOrganize />
      </Sequence>
      <Sequence
        from={5 * fps}
        durationInFrames={Math.round(4.4 * fps)}
        premountFor={1 * fps}
      >
        <Flow />
      </Sequence>
      <Sequence
        from={5 * fps + Math.round(4.4 * fps)}
        durationInFrames={5 * fps}
        premountFor={1 * fps}
      >
        <ValueUI />
      </Sequence>
      <Sequence
        from={5 * fps + Math.round(4.4 * fps) + 5 * fps}
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
