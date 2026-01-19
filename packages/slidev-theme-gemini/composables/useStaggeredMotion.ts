import { nextTick, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import { useMotion } from "@vueuse/motion";
import { onSlideEnter, onSlideLeave } from "@slidev/client";

type MotionControlsLite = {
  stop: (keys?: string | string[]) => void;
  set: (variant: "initial" | "enter") => void;
  apply: (variant: "enter") => Promise<void[]> | undefined;
};

type StaggeredMotionOptions = {
  initialY?: number;
  baseDelay?: number;
  step?: number;
};

type StaggeredMotionOptionsGetter = () => StaggeredMotionOptions;

const createStaggeredMotions = (
  elements: HTMLElement[],
  { initialY = 24, baseDelay = 0, step = 150 }: StaggeredMotionOptions = {},
): MotionControlsLite[] =>
  elements.map(
    (element, index) =>
      useMotion(element, {
        initial: {
          opacity: 0,
          y: initialY,
        },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            delay: baseDelay + index * step,
          },
        },
      }) as MotionControlsLite,
  );

const resolveOptions = (
  options: StaggeredMotionOptions | StaggeredMotionOptionsGetter,
) => (typeof options === "function" ? options() : options);

export function useStaggeredMotion(
  elements: MaybeRefOrGetter<HTMLElement[] | null>,
  options: StaggeredMotionOptions | StaggeredMotionOptionsGetter = {},
) {
  const instances: MotionControlsLite[] = [];

  const setup = (elements: HTMLElement[]) => {
    instances.splice(
      0,
      instances.length,
      ...createStaggeredMotions(elements, resolveOptions(options)),
    );
  };

  const replay = async () => {
    await nextTick();
    if (instances.length === 0) {
      const resolvedElements = toValue(elements);
      if (!resolvedElements || resolvedElements.length === 0) return;

      setup(resolvedElements);
    }

    await nextTick();
    instances.forEach((instance) => {
      instance.apply("enter");
    });
  };

  onSlideEnter(() => {
    replay();
  });

  onSlideLeave(() => {
    instances.forEach((instance) => {
      instance.stop();
      instance.set("initial");
    });
  });

  return {
    replay,
  };
}
