import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadIbmPlexSans } from "@remotion/google-fonts/IBMPlexSans";

export const titleFont = loadSpaceGrotesk("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});

export const bodyFont = loadIbmPlexSans("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
