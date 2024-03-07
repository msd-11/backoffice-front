import { Input } from "@/components/ui/input";
import { Plus, Image, Trash } from "lucide-react";
import { useState } from "react";
import Title from "./Title";
import { useStore } from "@/stores/store";
import { API_URL } from "@/config";
import { sendImage } from "../api/sendImage";
import { toast } from "@/components/ui/use-toast";

interface IProps {}

const ProductImage: React.FC<IProps> = () => {
  const { productStore } = useStore();
  const [currentImage, setCurrentImage] = useState(
    productStore.form.getValues("images").length == 0
      ? null
      : "http://localhost:8080" + productStore.form.getValues("images")[0].path
  );

  const [allImages, setAllImages] = useState(
    productStore.form.getValues("images")
  );

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  const handleNewImage = (images: FileList) => {
    if (allImages.length < 5) {
      if (images[0].size > 1000000) {
        toast({
          title: "Image trop volumineuse",
          description: "Votre image est trop volumineuse, veuillez réessayer",
          variant: "destructive",
        });
      } else {
        sendImage(images[0])
          .then((res: any) => {
            const temp = Array.from(allImages);
            temp.push({ path: res.data, order: temp.length + 1 });
            setAllImages(temp);
            productStore.form.setValue("images", temp);
            setCurrentImage("http://localhost:8080" + res.data);
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
    }
  };

  const handleDeleteImage = () => {
    const temp = Array.from(allImages);

    temp.splice(
      temp.findIndex((e) => e.path === currentImage),
      1
    );

    setAllImages(temp);

    if (temp.length > 0) {
      setCurrentImage("http://localhost:8080" + temp[0].path);
    }
  };

  return (
    <div className="flex flex-col p-6 h-fit rounded-xl drop-shadow-sm bg-white gap-5">
      <Title>Image du produit</Title>

      {allImages === undefined || allImages.length === 0 ? (
        <div
          className="flex items-center justify-center w-full border rounded-xl"
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
        <div className="flex flex-col justify-center w-full rounded-xl">
          <div className="relative flex justify-center bg-gray-100 rounded-xl h-80 w-full">
            <Trash
              className="absolute bottom-2 right-2 hover:text-red-500 cursor-pointer"
              size={15}
              onClick={handleDeleteImage}
            />
            <img
              className="bg-gray-100 object-contain h-auto w-full rounded-xl"
              src={currentImage}
            />
          </div>
          <div className="flex gap-4 mt-4 max-w-2xl flex-wrap justify-center">
            {allImages.map((image: any) => (
              <div className="flex justify-center bg-gray-100 rounded-xl h-20 w-20">
                <img
                  className={`bg-gray-100 object-contain h-auto w-full rounded-xl border-primary ${
                    currentImage === `${API_URL}${image.path}` ? "border-2" : ""
                  }`}
                  src={`${API_URL}${image.path}`}
                  onClick={() => handleImageClick(`${API_URL}${image.path}`)}
                />
              </div>
            ))}

            {allImages.length === 5 ? null : (
              <div
                className="flex items-center justify-center w-20 border rounded-xl"
                style={{
                  borderStyle: "dashed",
                  borderWidth: "2px",
                }}
              >
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer hover:bg-gray-100"
                  style={{
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Plus color="gray" />
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
