import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface IProps {}

const ProductInformation: React.FC<IProps> = () => {
  const { productStore } = useStore();
  return (
    <div className="flex flex-col p-6 rounded-xl drop-shadow-sm bg-white gap-5">
      <Title>Informations basiques</Title>
      <div className="grid w-full items-center gap-1.5">
        <FormField
          control={productStore.form.control}
          name="nomProduit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nom du produit
              </FormLabel>
              <FormControl>
                <Input
                  id="productName"
                  placeholder="Intitulé du produit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <FormField
          control={productStore.form.control}
          name="descriptionProduit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Courte description du produit (caractéristiques, apparences...)"
                  className="resize-none h-80 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProductInformation;
