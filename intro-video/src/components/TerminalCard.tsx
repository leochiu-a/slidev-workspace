import type { CSSProperties, FC } from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { TypewriterText } from "./TypewriterText";

type TerminalCardProps = {
  commandText: string;
  statusText?: string;
  statusOpacity?: number;
  charsPerSecond?: number;
  style?: CSSProperties;
  typingAudio?: boolean;
};

export const TerminalCard: FC<TerminalCardProps> = ({
  commandText,
  statusText,
  statusOpacity = 1,
  charsPerSecond = 26,
  style,
  typingAudio = false,
}) => {
  const typingDurationFrames = Math.max(1, Math.ceil(commandText.length * (30 / charsPerSecond)));
  return (
    <div
      style={{
        width: 1200,
        height: 980,
        borderRadius: 20,
        backgroundColor: "#0F172A",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 24px 50px rgba(15, 23, 42, 0.35)",
        padding: 28,
        paddingTop: 64,
        fontFamily:
          "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: 34,
        color: "#E2E8F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 14,
        position: "relative",
        ...style,
      }}
    >
      {typingAudio ? (
        <Sequence from={0} durationInFrames={typingDurationFrames}>
          <Audio src={staticFile("typing.mp3")} volume={0.5} />
        </Sequence>
      ) : null}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "absolute",
          top: 16,
          left: 18,
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#FF5F57",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
          }}
        />
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#FEBB2E",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
          }}
        />
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#28C840",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "#34D399" }}>$</span>
        <TypewriterText text={commandText} charsPerSecond={charsPerSecond} />
      </div>
      {statusText ? (
        <div style={{ fontSize: 26, color: "#94A3B8", opacity: statusOpacity }}>
          {statusText}
        </div>
      ) : null}
    </div>
  );
};
