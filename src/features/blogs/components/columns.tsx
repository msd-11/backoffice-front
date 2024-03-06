import { ColumnDef } from "@tanstack/react-table";
import { Blog } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as dayjs from "dayjs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "createdAt",
    header: "Crée le",
    cell: ({ row }) => {
      return <p>{dayjs(row.original.createdAt).format("DD/MM/YYYY")}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const blog = row.original;

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
              <Link className="w-full" to={`/blogs/detail/${blog.id}`}>
                Modifier
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
