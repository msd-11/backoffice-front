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
import { sendImage } from "@/features/products/api/sendImage";
import { Image, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

interface IProps {}

const BlogDetail: React.FC<IProps> = () => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [values, setValues] = useState<Partial<z.infer<typeof blogSchema>>>({});

  const blogQuery = useBlog({ blogId: parseInt(id!) });

  const [allImages, setAllImages] = useState("");
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
    category: z
      .string()
      .default(blogQuery.data.data.category)
      .describe("Catégorie"),
    visible: z.boolean().default(blogQuery.data.data.visible).optional(),
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

  const handleSave = (values: FieldValues) => {
    console.log(values);
    let banner;
    if (allImages === null || allImages === "") {
      banner = blogQuery.data.data.bannerPath;
    } else {
      banner = allImages;
    }

    const data = {
      ...values,
      content: value,
      id: parseInt(id!),
      bannerPath: banner,
    };

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
                <p className="text-xs text-gray-500">
                  PNG ou JPG (MAX. 800x400px)
                </p>
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
              src={
                "http://localhost:8080" +
                (allImages === "" ? blogQuery.data.data.bannerPath : allImages)
              }
            />
          </div>
        )}
        <MDEditor value={value} onChange={setValue} />
        <AutoFormSubmit>Sauvegarder</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default BlogDetail;
