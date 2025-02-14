import type { Meta, StoryObj } from "@storybook/react";
import ProductImage from "../components/Products/ProductImage";

const meta = {
    title: "Product Image",
    component: ProductImage,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
} satisfies Meta<typeof ProductImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
