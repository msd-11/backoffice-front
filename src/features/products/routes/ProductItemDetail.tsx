"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as z from "zod";
import { ProductItem } from "../types";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { updateProductItem } from "../api/updateProductItem";
import { useProductItem } from "../api/getProductItem";

interface IProps {}

const ProductItemDetail: React.FC<IProps> = () => {
  const { id, refId } = useParams();

  const manufacturerQuery = useProductItem({ itemId: refId ?? "-1" });

  const manufacturerSchema = z.object({
    reference: z.string(),
  });

  useEffect(() => {}, [manufacturerQuery.data, manufacturerSchema]);

  const handleSubmit = (values: FieldValues) => {
    const data = {
      ...values,
      id: parseInt(refId ?? "-1"),
      product: parseInt(id ?? "-1"),
    };
    console.log(data);

    try {
      updateProductItem(data as ProductItem);
      toast({
        title: "Mise à jour",
        description: "Réference mis à jour avec succès",
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

  if (manufacturerQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!manufacturerQuery.data) {
    return null;
  }

  return (
    <div>
      <p className="p-6 text-2xl font-bold">Modifier fournisseur</p>
      <AutoForm
        // Pass the schema to the form
        values={manufacturerQuery.data?.data}
        className="p-6"
        formSchema={manufacturerSchema}
        onSubmit={handleSubmit}
      >
        <AutoFormSubmit>Sauvegarder</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default ProductItemDetail;
