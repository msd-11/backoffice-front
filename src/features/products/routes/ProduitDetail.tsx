import { useStore } from "@/stores/store";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ProductInformation from "../components/ProductInformation";
import ProductImage from "../components/ProductImage";
import ProductStock from "../components/ProductStock";
import ProductVisibility from "../components/ProductVisiblity";

interface IProps {}

const ProduitDetail: React.FC<IProps> = () => {
  const { productStore } = useStore();

  const form = useForm();
  productStore.form = useForm();

  return (
    <div className="h-full w-full bg-[#F9F9F9]">
      <p
        className="p-6 text-2xl font-bold"
        onClick={() => {
          productStore.form.setValue("nomProduit", "NON");
          console.log(productStore.form.control._formValues);
        }}
      >
        Modifier produit
      </p>

      <Form {...form}>
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
      </Form>
    </div>
  );
};

export default ProduitDetail;
