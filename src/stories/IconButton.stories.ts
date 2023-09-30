import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "../components/Sidebar/IconButton";
import { Package } from "lucide-react";

const meta = {
    title: "IconButton",
    component: IconButton,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Commandes",
        Icon: Package,
        selected: true,
    },
};
