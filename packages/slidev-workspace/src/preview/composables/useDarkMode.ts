import { ref, onMounted } from "vue";

export function useDarkMode() {
  const isDark = ref(false);

  const toggleDarkMode = (event: MouseEvent) => {
    if (!document.startViewTransition) {
      document.documentElement.classList.toggle("dark");
      isDark.value = document.documentElement.classList.contains("dark");
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

    const transition = document.startViewTransition(() => {
      const root = document.documentElement;

      const wasDark = root.classList.contains("dark");

      if (wasDark) {
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
      }

      isDark.value = !wasDark;
    });

    transition.ready.then(() => {
      console.log("Percentage position:", xPercent, yPercent);

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

  onMounted(() => {
    // Initialize dark mode state from document
    isDark.value = document.documentElement.classList.contains("dark");
  });

  return {
    isDark,
    toggleDarkMode,
  };
}
