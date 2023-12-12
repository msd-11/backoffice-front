import * as React from "react";
import DataTable from "../components/DataTable";
import { columns } from "../components/Columns";
import { useProducts } from "../api/getProducts";
import { useCategories } from "../api/getCategories";
import { Button } from "@/components/ui/button";

interface IProps {}

const Produits: React.FC<IProps> = () => {
  const productsQuery = useProducts();

  if (productsQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!productsQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={productsQuery.data} />
    </div>
  );
};

export default Produits;
