import { loadFont as loadBricolageGrotesque } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";

export const titleFont = loadBricolageGrotesque("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export const bodyFont = loadFigtree("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
