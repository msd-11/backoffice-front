import type { Meta, StoryObj } from "@storybook/react";
import { columns } from "../components/Products/Columns";
import DataTable from "../components/Products/DataTable";

const meta = {
    title: "Tableau de produit",
    component: DataTable,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        columns: columns,
        data: [
            {
                id: "728ed52f",
                name: "Switch rouge",
                picture:
                    "https://www.cherrymx.de/_Resources/Persistent/3/f/3/c/3f3cc49f11b55bb11db3ade8f8b1ee5404f90a24/MX2A_Red_non_RGB-368x368.png",
                category: "switch",
                stock: 125,
                price: 1.25,
            },
            {
                id: "728ed52f",
                name: "Switch bleu",
                picture:
                    "https://m.media-amazon.com/images/I/51mCqk9h9cL._AC_UF894,1000_QL80_.jpg",
                category: "switch",
                stock: 135,
                price: 1.45,
            },
        ],
    },
};
