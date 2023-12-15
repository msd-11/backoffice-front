import { useStore } from "@/stores/store";

import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ProductInformation from "../components/ProductInformation";
import ProductImage from "../components/ProductImage";
import ProductStock from "../components/ProductStock";
import ProductVisibility from "../components/ProductVisiblity";
import { useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { addProduct } from "../api/addProduct";

interface IProps {}

const ProduitAdd: React.FC<IProps> = () => {
  const { toast } = useToast();

  const { productStore } = useStore();

  productStore.form = useForm();

  useEffect(() => {
    productStore.form.reset({
      categories: [],
      description: "",
      imageProduit: "",
      manufacturer: null,
      name: "",
      price: null,
      status: "Active",
    });
  }, []);

  const onSubmit = async (values: FieldValues) => {
    console.log(values);

    try {
      await addProduct(values as Product);

      toast({
        title: "Ajout",
        description: "Produit ajouté avec succès",
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

  if (productStore.form.getValues("categories") === undefined) {
    return null;
  }

  return (
    <div className="h-max w-full bg-[#F9F9F9]">
      <p className="p-6 text-2xl font-bold">Ajouter produit</p>

      <Form {...productStore.form}>
        <form
          onSubmit={productStore.form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex gap-6 p-6">
            <div className="flex flex-col w-3/4 gap-6">
              <ProductInformation />
              <ProductStock />
            </div>
            <div className="flex flex-col w-1/4 gap-6">
              <ProductImage />
              <ProductVisibility />
            </div>
          </div>

          <Button type="submit">Sauvegarder</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProduitAdd;
