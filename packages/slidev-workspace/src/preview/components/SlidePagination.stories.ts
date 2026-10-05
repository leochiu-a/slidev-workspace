import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import "../assets/main.css";
import SlidePagination from "./SlidePagination.vue";

const meta: Meta<typeof SlidePagination> = {
  title: "Preview/SlidePagination",
  component: SlidePagination,
  args: {
    total: 120,
    itemsPerPage: 12,
  },
  render: (args) => ({
    components: { SlidePagination },
    setup: () => ({ args, page: ref(1) }),
    template: "<SlidePagination v-bind='args' v-model:page='page' />",
  }),
};

export default meta;

type Story = StoryObj<typeof SlidePagination>;

export const Default: Story = {};

export const FewPages: Story = {
  args: {
    total: 30,
  },
};
