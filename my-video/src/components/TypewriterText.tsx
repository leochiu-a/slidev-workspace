import type { FC } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type TypewriterTextProps = {
  text: string;
  charsPerSecond?: number;
  cursor?: boolean;
};

export const TypewriterText: FC<TypewriterTextProps> = ({
  text,
  charsPerSecond = 22,
  cursor = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charsToShow = Math.max(0, Math.floor((frame / fps) * charsPerSecond));
  const clipped = text.slice(0, charsToShow);
  const showCursor = cursor && Math.floor(frame / (fps / 2)) % 2 === 0;

  return (
    <span style={{ display: "inline-flex", alignItems: "baseline" }}>
      {clipped}
      {cursor ? (
        <span
          style={{
            display: "inline-block",
            width: "0.6ch",
            marginLeft: "0.05ch",
            opacity: showCursor ? 1 : 0,
          }}
        >
          |
        </span>
      ) : null}
    </span>
  );
};
