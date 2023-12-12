"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";

const manufacturerSchema = z.object({
  name: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  email: z.string().email(),
  website: z.string().url(),
  country: z.string(),
  status: z.string(),
});

interface IProps {}

const ManufacturerDetail: React.FC<IProps> = () => {
  return (
    <AutoForm
      // Pass the schema to the form

      formSchema={manufacturerSchema}
    >
      <AutoFormSubmit>Send now</AutoFormSubmit>
    </AutoForm>
  );
};

export default ManufacturerDetail;
