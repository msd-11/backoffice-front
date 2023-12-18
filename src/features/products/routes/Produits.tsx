import * as React from "react";
import DataTable from "../components/DataTable";
import { columns } from "../components/Columns";
import { useProducts } from "../api/getProducts";
import { useCategories } from "../api/getCategories";
import { Button } from "@/components/ui/button";

interface IProps {}

const Produits: React.FC<IProps> = () => {
  const productsQuery = useProducts();

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={productsQuery.data ? productsQuery.data : []}
        isLoading={productsQuery.isLoading}
      />
    </div>
  );
};

export default Produits;
