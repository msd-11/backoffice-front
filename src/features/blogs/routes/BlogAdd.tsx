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
import { Blog } from "../types";
import { toast } from "@/components/ui/use-toast";
import { addBlog } from "../api/addBlog";

interface IProps {}

const BlogAdd: React.FC<IProps> = () => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState<Partial<z.infer<typeof blogSchema>>>({});

  const blogSchema = z.object({
    title: z.string().describe("Titre"),
    slug: z.string(),
    visible: z.boolean().default(true),
  });

  const convertToSlug = (inputString: string) => {
    // Convert to lowercase and remove special characters
    const slug = inputString
      .toLowerCase()
      .replace(/[^\w\sà-úâ-ûä-üçéèêëîïôœöùûü]/g, "");
    // Replace spaces with dashes
    return slug.replace(/\s+/g, "-");
  };

  const handleSave = async (values: FieldValues) => {
    console.log(values);
    const data = { ...values, content: value };

    try {
      //updateBlog(data as Blog);
      console.log(data);
      const addblog = await addBlog(data as Blog);

      toast({
        title: "Ajout",
        description: "Blog ajouté avec succès",
        variant: "success",
      });
    } catch (e: unknown) {
      console.log(e);
      let errorMessage = "";
      if (e.response.data.data.description === "Blog slug already exists")
        errorMessage = "Le slug du blog est déjà existant";
      else errorMessage = "Une erreur est survenue, veuillez réessayer";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6" data-color-mode="light">
      <p className="pb-6 text-2xl font-bold">Modifier un blog</p>
      <AutoForm
        onSubmit={handleSave}
        className="mb-6"
        values={values}
        onValuesChange={(value) => {
          if (values.title === undefined) {
            value.slug = convertToSlug(value.title);
          } else {
            if (value.title !== values.title)
              value.slug = convertToSlug(value.title);
          }
          setValues(value);
        }}
        formSchema={blogSchema}
        fieldConfig={{
          visible: {
            inputProps: {
              required: false,

              defaultChecked: true,
            },
          },
        }}
      >
        <MDEditor value={value} onChange={setValue} />
        <AutoFormSubmit>Ajouter</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default BlogAdd;
