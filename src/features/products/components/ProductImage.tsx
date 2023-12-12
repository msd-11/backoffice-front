import { Input } from "@/components/ui/input";
import { Plus, Image } from "lucide-react";
import { useState } from "react";
import Title from "./Title";
import { useStore } from "@/stores/store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { API_URL } from "@/config";

interface IProps {}

const ProductImage: React.FC<IProps> = () => {
  const { productStore } = useStore();
  const [currentImage, setCurrentImage] = useState(
    "https://www.cherrymx.de/_Resources/Persistent/3/f/3/c/3f3cc49f11b55bb11db3ade8f8b1ee5404f90a24/MX2A_Red_non_RGB-368x368.png"
  );

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  if (productStore.form.getValues("images") === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col p-6 h-fit rounded-xl drop-shadow-sm bg-white gap-5">
      <Title>Image du produit</Title>

      {productStore.form.getValues("images").length === 0 ? (
        <FormField
          control={productStore.form.control}
          name="imageProduit"
          render={({ field }) => (
            <FormItem>
              <FormControl>
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
                      <p className="text-xs text-gray-500">
                        PNG ou JPG (MAX. 800x400px)
                      </p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      style={{ display: "none" }}
                      {...field}
                    />
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <div className="flex flex-col justify-center w-full rounded-xl">
          <div className="flex justify-center bg-gray-100 rounded-xl h-80 w-80">
            <img
              className="bg-gray-100 object-contain h-auto w-full rounded-xl"
              src={currentImage}
            />
          </div>
          <div className="flex gap-4 mt-4">
            {productStore.form.getValues("images").map((image: any) => (
              <div className="flex justify-center bg-gray-100 rounded-xl h-20 w-20">
                <img
                  className={`bg-gray-100 object-contain h-auto w-full rounded-xl border-primary ${
                    currentImage === `${API_URL}/${image.path}`
                      ? "border-2"
                      : ""
                  }`}
                  src={`${API_URL}/${image.path}`}
                  onClick={() => handleImageClick(`${API_URL}/${image.path}`)}
                />
              </div>
            ))}

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
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
