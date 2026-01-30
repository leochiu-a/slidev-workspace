import { Composition } from "remotion";
import { Promo30, getPromo30Timings } from "./Promo30";
import { layout } from "./theme/tokens";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Promo30"
      component={Promo30}
      durationInFrames={getPromo30Timings(30).totalDurationFrames}
      fps={30}
      width={layout.width}
      height={layout.height}
    />
  );
};
