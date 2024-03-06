import { ColumnDef } from "@tanstack/react-table";
import { Employee, Role } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select as SelectSingle,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Select from "react-select";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ResetPasswordDTO, resetPassword } from "../api/resetPassword";
import { useRoles } from "../api/getRoles";
import { setRoles } from "../api/setRoles";

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

const reinitPassword = (email: string) => {
  resetPassword({ email: email } as ResetPasswordDTO);
  toast({
    title: "Réinitialisation effectuée",
    description: "Un mail a été envoyé à l'employé",
    variant: "success",
  });
};

export const columns = (roles): ColumnDef<Employee>[] => {
  return [
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
      id: "roles",
      header: "Rôle",
      cell: ({ row }) => {
        return (
          <Select
            defaultValue={
              row.original.roles === null
                ? undefined
                : row.original.roles.map((role: Role) => {
                    return {
                      value: role.id,
                      label:
                        role.name.charAt(0).toUpperCase() + role.name.slice(1),
                    };
                  })
            }
            className="w-[30rem]"
            placeholder={"Sélectionner des rôles..."}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            isMulti
            onChange={(value) =>
              setRoles(
                value.map((role) => {
                  return { id: role.value };
                }),
                row.original.puid
              )
            }
            options={roles.map((role: Role) => {
              return {
                value: role.id,
                label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
              };
            })}
          />
        );
      },
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
                onClick={() => reinitPassword(employee.email)}
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
};
