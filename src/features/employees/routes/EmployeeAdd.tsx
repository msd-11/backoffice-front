import { useParams } from "react-router-dom";
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
import { Blog, Employee } from "../types";
import { toast } from "@/components/ui/use-toast";
import { addEmployee } from "../api/addEmployee";

interface IProps {}

const EmployeeAdd: React.FC<IProps> = () => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState<Partial<z.infer<typeof blogSchema>>>({});

  const blogSchema = z.object({
    email: z.string().describe("Email"),
    firstname: z.string().describe("Prénom"),
    lastname: z.string().describe("Nom"),
  });

  const handleSave = async (values: FieldValues) => {
    const data = { ...values, content: value };

    try {
      const addemployee = await addEmployee(data as Employee);

      toast({
        title: "Ajout",
        description: "Blog ajouté avec succès",
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
        <AutoFormSubmit>Ajouter</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default EmployeeAdd;
