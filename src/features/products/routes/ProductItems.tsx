import * as React from "react";
import { columnsItem } from "../components/ColumnsItem";
import { useParams } from "react-router-dom";
import { useProductItems } from "../api/getProductItems";
import { DataTableItem } from "../components/DataTableItem";

interface IProps {}

const ProductItems: React.FC<IProps> = () => {
  const { id } = useParams();
  const productsItem = useProductItems({ productId: id ?? "0" });

  return (
    <div className="p-4">
      <DataTableItem
        columns={columnsItem}
        data={productsItem.data ? productsItem.data.data : []}
        isLoading={productsItem.isLoading}
      />
    </div>
  );
};

export default ProductItems;
