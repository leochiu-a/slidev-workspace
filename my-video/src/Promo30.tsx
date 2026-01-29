import type { FC } from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { CTA } from "./scenes/CTA";
import { Flow } from "./scenes/Flow";
import { Hook } from "./scenes/Hook";
import { Results } from "./scenes/Results";
import { Title } from "./scenes/Title";
import { ValueCLI } from "./scenes/ValueCLI";
import { ValueOrganize } from "./scenes/ValueOrganize";
import { ValueUI } from "./scenes/ValueUI";
import { colors } from "./theme/tokens";

export const Promo30: FC = () => {
  const { fps } = useVideoConfig();

  // Visual timing is verified in Remotion Studio; no automated tests are set up for motion sequencing.
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Sequence from={0} durationInFrames={2 * fps} premountFor={1 * fps}>
        <Hook />
      </Sequence>
      <Sequence from={2 * fps} durationInFrames={3 * fps} premountFor={1 * fps}>
        <Title />
      </Sequence>
      <Sequence from={5 * fps} durationInFrames={4 * fps} premountFor={1 * fps}>
        <ValueOrganize />
      </Sequence>
      <Sequence from={9 * fps} durationInFrames={4 * fps} premountFor={1 * fps}>
        <ValueUI />
      </Sequence>
      <Sequence from={13 * fps} durationInFrames={4 * fps} premountFor={1 * fps}>
        <ValueCLI />
      </Sequence>
      <Sequence from={17 * fps} durationInFrames={5 * fps} premountFor={1 * fps}>
        <Flow />
      </Sequence>
      <Sequence from={22 * fps} durationInFrames={5 * fps} premountFor={1 * fps}>
        <Results />
      </Sequence>
      <Sequence from={27 * fps} durationInFrames={3 * fps} premountFor={1 * fps}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
