import * as React from "react";
import { columns } from "@/components/Products/Columns";
import DataTable from "@/components/Products/DataTable";

interface IProps {}

const Produits: React.FC<IProps> = () => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={[
          {
            id: "728ed52f",
            name: "Switch rouge",
            category: "switch",
            stock: 125,
            price: 1.25,
          },
          {
            id: "728ed52f",
            name: "Switch bleu",
            category: "switch",
            stock: 135,
            price: 1.45,
          },
        ]}
      />
    </div>
  );
};

export default Produits;
