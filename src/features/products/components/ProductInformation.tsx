import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Title from "./Title";
import chroma from "chroma-js";
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
import { useForm } from "react-hook-form";

interface IProps {}

const ProductInformation: React.FC<IProps> = () => {
  const { productStore } = useStore();
  const manufacturerQuery = useManufacturers();
  const categoryQuery = useCategories();

  if (productStore.form.getValues("categories") === undefined) {
  }

  if (manufacturerQuery.isLoading || categoryQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!manufacturerQuery.data || !categoryQuery.data) {
    return null;
  }

  function invertColor(hex) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    // invert color components
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
  }

  function padZero(str, len) {
    len = len || 2;
    const zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
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

      <div className="grid grid-cols-4 w-full items-center gap-1.5">
        <FormField
          control={productStore.form.control}
          name="manufacturer"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1">
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Fournisseur
                </FormLabel>
                <FormControl>
                  <SelectSingle
                    defaultValue={
                      field.value === null ? undefined : field.value.toString()
                    }
                    onValueChange={(value) => field.onChange(parseInt(value))}
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
                    defaultValue={
                      field.value === null
                        ? undefined
                        : field.value.map((category: number | Category) => {
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
                          })
                    }
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

        <FormField
          control={productStore.form.control}
          name="color"
          render={({ field }) => {
            console.log(field);

            const complementaryColor = invertColor(field.value);
            console.log(complementaryColor);
            return (
              <FormItem className="col-span-1 pl-4">
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Couleur
                </FormLabel>
                <FormControl>
                  <Input
                    style={{
                      backgroundColor: field.value,
                      color: complementaryColor,
                    }}
                    id="color"
                    placeholder="Couleur du produit"
                    {...field}
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
