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

const ProductStock: React.FC<IProps> = () => {
  const { productStore } = useStore();
  return (
    <div className="flex flex-col p-6 rounded-xl drop-shadow-sm bg-white gap-5">
      <Title>Stock & Prix</Title>
      <div className="flex justify-start items-start gap-6">
        <div className="grid w-full items-center gap-1.5">
          <FormField
            control={productStore.form.control}
            name="stockProduit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Stock
                </FormLabel>
                <FormControl>
                  <Input
                    id="stockNumber"
                    placeholder="Nombre de produits disponible"
                    type="number"
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
            name="priceProduit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Prix
                </FormLabel>
                <FormControl>
                  <Input placeholder="En euro" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductStock;
