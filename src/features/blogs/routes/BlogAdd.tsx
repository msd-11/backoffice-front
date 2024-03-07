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
import { Image, Plus, Trash } from "lucide-react";
import { sendImage } from "@/features/products/api/sendImage";

interface IProps {}

const BlogAdd: React.FC<IProps> = () => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState<Partial<z.infer<typeof blogSchema>>>({});
  const [allImages, setAllImages] = useState(null);

  const blogSchema = z.object({
    title: z.string().describe("Titre"),
    slug: z.string(),
    category: z.string().describe("Catégorie"),
    visible: z.boolean().default(true),
  });

  const handleNewImage = (images: FileList) => {
    if (images[0].size > 1000000) {
      toast({
        title: "Image trop volumineuse",
        description: "Votre image est trop volumineuse, veuillez réessayer",
        variant: "destructive",
      });
    } else {
      sendImage(images[0])
        .then((res: any) => {
          setAllImages(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Erreur",
            description:
              "Une erreur est survenue lors de l'upload de l'image, veuillez réessayer",
            variant: "destructive",
          });
        });
    }
  };

  const handleDeleteImage = () => {
    setAllImages(null);
  };

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
    const data = { ...values, content: value, bannerPath: allImages };

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
      <p className="pb-6 text-2xl font-bold">Ajouter un blog</p>
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
        {allImages === null ? (
          <div
            className="flex items-center justify-center w-80 border rounded-xl"
            style={{
              borderStyle: "dashed",
              borderWidth: "2px",
            }}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              style={{
                paddingTop: "5rem",
                paddingBottom: "5rem",
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <Image color="gray" />
                <p className="mb-2 text-sm font-semibold text-gray-500">
                  Upload l'image du produit
                </p>
                <p className="text-xs text-gray-500">PNG ou JPG (MAX. 1Mo)</p>
              </div>
              <Input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => handleNewImage(e.target.files)}
                style={{ display: "none" }}
              />
            </label>
          </div>
        ) : (
          <div className="relative flex justify-center bg-gray-100 rounded-xl h-80 w-80">
            <Trash
              className="absolute bottom-2 right-2 hover:text-red-500 cursor-pointer"
              size={15}
              onClick={handleDeleteImage}
            />
            <img
              className="bg-gray-100 object-contain h-auto w-full rounded-xl"
              src={"http://localhost:8080" + allImages}
            />
          </div>
        )}
        <MDEditor value={value} onChange={setValue} />
        <AutoFormSubmit>Ajouter</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default BlogAdd;
