import type { Meta, StoryObj } from "@storybook/react";
import ProductInformation from "../components/Products/ProductInformation";

const meta = {
    title: "Product Information",
    component: ProductInformation,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
} satisfies Meta<typeof ProductInformation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
