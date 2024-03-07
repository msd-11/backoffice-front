import { useBlog } from "../api/Blog";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { AutoFormInputComponentProps } from "@/components/ui/auto-form/types";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues } from "react-hook-form";
import { updateBlog } from "../api/updateBlog";
import { Blog, Employee, Role } from "../types";
import { toast } from "@/components/ui/use-toast";
import { addEmployee } from "../api/addEmployee";
import { useRoles } from "../api/getRoles";

import Select from "react-select";
import { setRoles } from "../api/setRoles";

interface IProps {}

const EmployeeAdd: React.FC<IProps> = () => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState<Partial<z.infer<typeof blogSchema>>>({});
  const [rolesTable, setRolesTable] = useState([]);

  const roles = useRoles();

  if (roles.isLoading) {
    return <p>Loading</p>;
  }

  const rolesArray = [];
  roles.data?.data.map((value) => {
    rolesArray.push(value.name);
  });

  const blogSchema = z.object({
    email: z.string().email().describe("Email"),
    firstname: z.string().describe("Prénom"),
    lastname: z.string().describe("Nom"),
  });

  const handleSave = async (values: FieldValues) => {
    const data = {
      ...values,
      content: value,
      roles: rolesTable.map((value: any) => {
        return { id: value.value };
      }),
    };

    try {
      const addemployee = await addEmployee(data as Employee);

      toast({
        title: "Ajout",
        description: "Employé ajouté avec succès",
        variant: "success",
      });
    } catch (e: unknown) {
      console.log(e);
      const errorMessage = "Une erreur est survenue, veuillez réessayer";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6" data-color-mode="light">
      <p className="pb-6 text-2xl font-bold">Ajouter un employé</p>
      <AutoForm
        onSubmit={handleSave}
        className="mb-6"
        values={values}
        formSchema={blogSchema}
      >
        <Select
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
          onChange={(value) => setRolesTable(value)}
          options={roles.data?.data.map((role: Role) => {
            return {
              value: role.id,
              label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
            };
          })}
        />
        <AutoFormSubmit>Ajouter</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default EmployeeAdd;
