import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as dayjs from "dayjs";
import { processOrder } from "../api/processOrder";
import { shippedOrder } from "../api/shippedOrder";
import { shipOrder } from "../api/shipOrder";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/react-query";
import { Link } from "react-router-dom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "N°",
  },
  {
    accessorKey: "created_at",
    header: "Crée le",
    cell: ({ row }) => {
      const order = row.original;
      return <p> {dayjs(order.created_at).format("DD/MM/YYYY HH:mm")} </p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <p>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

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
              <Link to={"detail"} state={{ order: order }}>
                Voir détail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                await processOrder({ id: order.id });

                queryClient.invalidateQueries({ queryKey: ["orders"] });
                toast({
                  title: "Etat mis à jour",
                  description: "L'etat a été mis à jour avec succès",
                  variant: "success",
                });
              }}
              className="hover:bg-gray-100 select-none"
            >
              Passer en traitement
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await shipOrder({ id: order.id });

                queryClient.invalidateQueries({ queryKey: ["orders"] });
                toast({
                  title: "Etat mis à jour",
                  description: "L'etat a été mis à jour avec succès",
                  variant: "success",
                });
              }}
              className="hover:bg-gray-100 select-none"
            >
              Passer en livraison
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await shippedOrder({ id: order.id });

                queryClient.invalidateQueries({ queryKey: ["orders"] });
                toast({
                  title: "Etat mis à jour",
                  description: "L'etat a été mis à jour avec succès",
                  variant: "success",
                });
              }}
              className="hover:bg-gray-100 select-none"
            >
              Passer en livrée
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
