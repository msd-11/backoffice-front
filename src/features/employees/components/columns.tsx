import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "../types";
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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//

const disableEmployee = (puid: string) => {
  toast({
    title: "Désactivation effectuée",
    description: "L'employé a été désactivé",
    variant: "success",
  });
};

const reinitPassword = (puid: string) => {
  toast({
    title: "Réinitialisation effectuée",
    description: "Un mail a été envoyé à l'employé",
    variant: "success",
  });
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "lastname",
    header: "Nom",
  },
  {
    accessorKey: "firstname",
    header: "Prénom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;

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
              onClick={() => reinitPassword(employee.puid)}
              className="hover:bg-gray-100 select-none"
            >
              Réinitialiser mot de passe
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => disableEmployee(employee.puid)}
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
