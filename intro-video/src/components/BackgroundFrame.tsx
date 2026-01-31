import type { CSSProperties, FC, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { colors, gradients } from "../theme/tokens";

export type BackgroundFrameProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

export const BackgroundFrame: FC<BackgroundFrameProps> = ({ children, style }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        backgroundImage: gradients.background,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: colors.text,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
