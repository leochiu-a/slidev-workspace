import { Composition } from "remotion";
import { Promo30 } from "./Promo30";
import { layout } from "./theme/tokens";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Promo30"
      component={Promo30}
      durationInFrames={900}
      fps={30}
      width={layout.width}
      height={layout.height}
    />
  );
};
