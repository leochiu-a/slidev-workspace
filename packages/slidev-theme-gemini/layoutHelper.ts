import type { CSSProperties } from "vue";

// Resolve URLs from frontmatter and prepend the Slidev base path when needed.
export function resolveAssetUrl(url: string) {
  if (url.startsWith("/")) return import.meta.env.BASE_URL + url.slice(1);
  return url;
}

export function handleBackground(background?: string): CSSProperties {
  const isColor =
    background && ["#", "rgb", "hsl"].some((v) => background.indexOf(v) === 0);

  const style = {
    background: isColor ? background : undefined,
    backgroundImage: isColor
      ? undefined
      : background
        ? `url("${resolveAssetUrl(background)}")`
        : undefined,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  if (!style.background) delete style.background;

  return style;
}
