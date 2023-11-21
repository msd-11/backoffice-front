import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    picture: string;
    name: string;
    category: string;
    stock: number;
    price: number;
};

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Produit",
        cell: ({ row }) => (
            <div className="capitalize grid grid-cols-[25%_75%]  items-center gap-3">
                <img
                    className="bg-gray-100 p-1 rounded w-14 h-14"
                    src={row.getValue("picture")}
                />
                <p>{row.getValue("name")}</p>
            </div>
        ),
    },
    {
        accessorKey: "picture",
        header: "",
        cell: "",
    },
    {
        accessorKey: "category",
        header: "Categorie",
        cell: ({ row }) => (
            <div className="capitalize bg-gray-100  w-fit px-2 py-1 text-center rounded-md">
                {row.getValue("category")}
            </div>
        ),
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    className="m-0 pl-0"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },

        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("stock")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-left">Prix</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(amount);

            return <div className="text-left font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel className="font-semibold select-none">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            className="hover:bg-gray-100 select-none"
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-gray-100 select-none">
                            Voir historique
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
