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
import {
  Select as SelectSingle,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useManufacturers } from "@/features/manufacturers/api/getManufacturers";
import { useCategories } from "../api/getCategories";

import Select from "react-select";
import { Category } from "../types";

interface IProps {}

const ProductInformation: React.FC<IProps> = () => {
  const { productStore } = useStore();
  const manufacturerQuery = useManufacturers();
  const categoryQuery = useCategories();

  if (manufacturerQuery.isLoading || categoryQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!manufacturerQuery.data || !categoryQuery.data) {
    return null;
  }

  console.log(manufacturerQuery.data);
  console.log(productStore.form.getValues());

  return (
    <div className="flex flex-col p-6 rounded-xl drop-shadow-sm bg-white gap-5">
      <Title>Informations basiques</Title>
      <div className="grid w-full items-center gap-1.5">
        <FormField
          control={productStore.form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nom du produit
              </FormLabel>
              <FormControl>
                <Input id="name" placeholder="Intitulé du produit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <FormField
          control={productStore.form.control}
          name="description"
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

      <div className="grid grid-cols-3 w-full items-center gap-1.5">
        <FormField
          control={productStore.form.control}
          name="manufacturer"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Fournisseur
                </FormLabel>
                <FormControl>
                  <SelectSingle
                    defaultValue={field.value.toString()}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Sélectionner un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturerQuery.data!.data.map((value) => (
                        <SelectItem value={value.id.toString()}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectSingle>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={productStore.form.control}
          name="categories"
          render={({ field }) => {
            return (
              <FormItem className="col-span-2">
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Catégories
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value.map(
                      (category: number | Category) => {
                        console.log(category);

                        if (typeof category === "number") {
                          return {
                            value: category,
                            label: categoryQuery.data.data.find(
                              (x) => x.id === category
                            )!.name,
                          };
                        } else {
                          return category;
                        }
                      }
                    )}
                    placeholder={"Sélectionner des catégories..."}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                      }),
                    }}
                    isMulti
                    onChange={(value) =>
                      field.onChange(value.map((value) => value.value))
                    }
                    options={categoryQuery.data.data.map((category) => {
                      return { value: category.id, label: category.name };
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <div className="grid w-full items-center gap-1.5"></div>
    </div>
  );
};

export default ProductInformation;
