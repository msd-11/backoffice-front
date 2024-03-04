import { useParams } from "react-router-dom";
import { useBlog } from "../api/getBlog";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { FieldValues } from "react-hook-form";
import { updateBlog } from "../api/updateBlog";
import { Blog } from "../types";
import { toast } from "@/components/ui/use-toast";

interface IProps {}

const BlogDetail: React.FC<IProps> = () => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [values, setValues] = useState<Partial<z.infer<typeof blogSchema>>>({});

  const blogQuery = useBlog({ blogId: parseInt(id!) });

  useEffect(() => {
    if (!blogQuery.isLoading && blogQuery.data) {
      setValue(blogQuery.data.data.content);
    }
  }, [blogQuery.data]);
  if (blogQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!blogQuery.data) {
    return null;
  }

  const blogSchema = z.object({
    title: z.string().default(blogQuery.data.data.title).describe("Titre"),
    slug: z.string().default(blogQuery.data.data.slug),
    visible: z.boolean().default(blogQuery.data.data.visible).optional(),
  });

  const convertToSlug = (inputString: string) => {
    // Convert to lowercase and remove special characters
    const slug = inputString
      .toLowerCase()
      .replace(/[^\w\sà-úâ-ûä-üçéèêëîïôœöùûü]/g, "");
    // Replace spaces with dashes
    return slug.replace(/\s+/g, "-");
  };

  const handleSave = (values: FieldValues) => {
    console.log(values);

    const data = { ...values, content: value, id: parseInt(id!) };

    try {
      updateBlog(data as Blog);
      toast({
        title: "Mise à jour",
        description: "Blog mis à jour avec succès",
        variant: "success",
      });
    } catch (e: unknown) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue, veuillez réessayer",
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
            if (value.title !== blogQuery.data.data.title)
              value.slug = convertToSlug(value.title);
          } else {
            if (value.title !== values.title)
              value.slug = convertToSlug(value.title);
          }
          setValues(value);
        }}
        formSchema={blogSchema}
      >
        <MDEditor value={value} onChange={setValue} />
        <AutoFormSubmit>Sauvegarder</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default BlogDetail;
