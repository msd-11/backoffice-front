import { ColumnDef } from "@tanstack/react-table";
import { Client } from "../types";
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
import { toast } from "@/components/ui/use-toast";
import { ResetPasswordDTO, resetPassword } from "../api/resetPassword";
import { disableClient } from "../api/disableClient";
import { queryClient } from "@/lib/react-query";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//

const disableClientAccount = async (puid: string) => {
  await disableClient({ puid: puid });
  queryClient.invalidateQueries({ queryKey: ["clients"] });
  toast({
    title: "Désactivation effectuée",
    description: "Le client a été désactivé",
    variant: "success",
  });
};

const reinitPassword = async (email: string) => {
  await resetPassword({ email: email } as ResetPasswordDTO);
  toast({
    title: "Réinitialisation effectuée",
    description: "Un mail a été envoyé au client",
    variant: "success",
  });
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "firstname",
    header: "Prénom",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.firstname.charAt(0).toUpperCase() +
            row.original.firstname.slice(1)}
        </p>
      );
    },
  },
  {
    accessorKey: "lastname",
    header: "Nom",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.lastname.charAt(0).toUpperCase() +
            row.original.lastname.slice(1)}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "disabled",
    header: "Status",
    cell: ({ row }) => {
      const client = row.original;

      return <p>{client.disabled ? "Désactivé" : "Activé"}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;

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
              onClick={() => reinitPassword(client.email)}
              className="hover:bg-gray-100 select-none"
            >
              Réinitialiser mot de passe
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => disableClientAccount(client.puid)}
              className="hover:bg-gray-100 select-none"
            >
              Désactiver
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
