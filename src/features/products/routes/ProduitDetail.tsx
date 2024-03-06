import { useStore } from "@/stores/store";

import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ProductInformation from "../components/ProductInformation";
import ProductImage from "../components/ProductImage";
import ProductStock from "../components/ProductStock";
import ProductVisibility from "../components/ProductVisiblity";
import { useParams } from "react-router-dom";
import { useProduct } from "../api/getProduct";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateProduct } from "../api/updateProduct";
import { Product } from "../types";
import { useToast } from "@/components/ui/use-toast";

interface IProps {}

type ProductParams = {
  id: string;
};

const ProduitDetail: React.FC<IProps> = () => {
  const { id } = useParams<ProductParams>();
  const { toast } = useToast();

  const productQuery = useProduct({ productId: parseInt(id) });

  const { productStore } = useStore();

  useEffect(() => {
    if (!productQuery.isLoading && productQuery.data) {
      console.log(productQuery.data!.data);
      productStore.form.reset(productQuery.data!.data);
    }
  }, [productQuery.data]);

  productStore.form = useForm();

  if (
    productQuery.isLoading ||
    productStore.form.getValues("manufacturer") === undefined
  ) {
    return <div>Loading</div>;
  }

  if (!productQuery.data) {
    return null;
  }

  const onSubmit = async (values: FieldValues) => {
    console.log(values);

    try {
      await updateProduct(values as Product);

      toast({
        title: "Mise à jour",
        description: "Produit mis à jour avec succès",
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
    <div className="h-full overflow-auto w-full bg-[#F9F9F9]">
      <p className="p-6 text-2xl font-bold">Modifier produit</p>

      <Form {...productStore.form}>
        <form
          onSubmit={productStore.form.handleSubmit(onSubmit)}
          className="mb-6 mt-1 bg-[#F9F9F9]"
        >
          <div className="flex gap-6 p-6 pb-2">
            <div className="flex flex-col w-3/4 gap-6">
              <ProductInformation />
              <ProductStock />
            </div>
            <div className="flex flex-col w-1/4 gap-6">
              <ProductImage />
              <ProductVisibility />
            </div>
          </div>

          <Button className="ml-6 mt-4 mb-4" type="submit">
            Sauvegarder
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProduitDetail;
