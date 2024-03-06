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
import { Product } from "../types";
import { Link, useNavigate } from "react-router-dom";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produit",
    cell: ({ row }) => (
      <div className="capitalize grid grid-cols-[25%_75%]  items-center gap-3">
        <img
          className="bg-gray-100 p-1 rounded w-14 h-14"
          src={"http://localhost:8080" + row.original.images[0]?.path ?? ""}
        />
        <p>{row.getValue("name")}</p>
      </div>
    ),
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {row
            .getValue("categories")
            .map((value: { id: string; name: string }) => (
              <div className="capitalize bg-gray-100  w-fit px-2 py-1 text-center rounded-md">
                {value.name}
              </div>
            ))}
        </div>
      );
    },
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
      const product = row.original;

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
            <DropdownMenuItem className="hover:bg-gray-100 select-none">
              <Link className="w-full" to={`/produits/detail/${product.id}`}>
                Modifier
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
