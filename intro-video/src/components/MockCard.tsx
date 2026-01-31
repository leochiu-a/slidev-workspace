import type { FC } from "react";
import { colors, layout, softShadow } from "../theme/tokens";

export type MockCardProps = {
  title: string;
  subtitle?: string;
  highlight?: boolean;
};

export const MockCard: FC<MockCardProps> = ({ title, subtitle, highlight }) => {
  return (
    <div
      style={{
        width: 360,
        height: 220,
        borderRadius: layout.cardRadius,
        backgroundColor: colors.card,
        border: `1px solid ${colors.borderStrong}`,
        boxShadow: softShadow,
        padding: 24,
        color: colors.textStrong,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: 22, opacity: 0.8 }}>{subtitle ?? "Slidev Deck"}</div>
      <div style={{ fontSize: 30, fontWeight: 600 }}>{title}</div>
      <div
        style={{
          height: 6,
          borderRadius: 999,
          backgroundColor: highlight ? colors.primary : colors.secondary,
          width: highlight ? "80%" : "60%",
          opacity: 0.9,
        }}
      />
    </div>
  );
};
