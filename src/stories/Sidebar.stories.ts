import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "../components/Sidebar";
import {
    withRouter,
    reactRouterParameters,
} from "storybook-addon-react-router-v6";

const meta = {
    title: "Sidebar",
    component: Sidebar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [withRouter],
};
export const Products: Story = {
    decorators: [withRouter],
    parameters: {
        reactRouter: reactRouterParameters({
            routing: { path: "/produits" },
        }),
    },
};
