"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as z from "zod";
import { useManufacturer } from "../api/getManufacturer";
import { updateManufacturer } from "../api/updateManufacturer";
import { Manufacturer } from "../types";
import { useEffect } from "react";
import { AutoFormInputComponentProps } from "@/components/ui/auto-form/types";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface IProps {}

const ManufacturerDetail: React.FC<IProps> = () => {
  const { id } = useParams();

  const manufacturerQuery = useManufacturer({ manufacturerId: id });

  const manufacturerSchema = z.object({
    name: z.string(),
    address: z.string(),
    contactNumber: z.string(),
    email: z.string().email(),
    website: z.string().url(),
    country: z.string(),
    status: z
      .enum(["Active", "Inactive"])
      .default(
        manufacturerQuery.data?.data.status === "Active" ? "Active" : "Inactive"
      ),
  });

  useEffect(() => {}, [manufacturerQuery.data, manufacturerSchema]);

  const handleSubmit = (values: FieldValues) => {
    const data = { ...values, id: parseInt(id) };
    console.log(data);

    try {
      updateManufacturer(data as Manufacturer);
      toast({
        title: "Mise à jour",
        description: "Fournisseur mis à jour avec succès",
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
        fieldConfig={{
          status: {
            fieldType: ({ field }: AutoFormInputComponentProps) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Définir un status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            ),
          },
        }}
      >
        <AutoFormSubmit>Sauvegarder</AutoFormSubmit>
      </AutoForm>
    </div>
  );
};

export default ManufacturerDetail;
