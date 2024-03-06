import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

const ProductVisibility: React.FC<IProps> = () => {
  const { productStore } = useStore();
  return (
    <div className="flex flex-col p-6 h-fit rounded-xl drop-shadow-sm bg-white gap-5">
      <Title>Visibilité</Title>
      <FormField
        control={productStore.form.control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormControl>
              <RadioGroup value={value} onValueChange={onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="publishedRadio" />
                  <Label htmlFor="publishedRadio">Publié</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="hiddenRadio" />
                  <Label htmlFor="hiddenRadio">Caché</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductVisibility;
