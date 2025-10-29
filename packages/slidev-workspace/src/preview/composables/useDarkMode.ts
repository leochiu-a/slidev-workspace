import { useDark } from "@vueuse/core";

export function useDarkMode() {
  const isDark = useDark();

  const toggleDarkMode = (event: MouseEvent) => {
    if (!document.startViewTransition) {
      isDark.value = !isDark.value;
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    // Calculate percentage-based position for better accuracy
    const xPercent = (x / window.innerWidth) * 100;
    const yPercent = (y / window.innerHeight) * 100;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const wasDark = isDark.value;

    const transition = document.startViewTransition(() => {
      isDark.value = !wasDark;
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${xPercent}% ${yPercent}%)`,
        `circle(${endRadius}px at ${xPercent}% ${yPercent}%)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark.value ? clipPath.reverse() : clipPath,
        },
        {
          duration: 200,
          easing: "ease-in",
          pseudoElement: isDark.value
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        },
      );
    });
  };

  return {
    isDark,
    toggleDarkMode,
  };
}
