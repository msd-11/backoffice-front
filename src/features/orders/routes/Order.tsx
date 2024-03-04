import { useOrders } from "../api/getOrders";
import { columns } from "../components/columns";
import { DataTable } from "../components/dataTable";

interface IProps {}

const Order: React.FC<IProps> = () => {
  const orderQuery = useOrders();

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={orderQuery.data ? orderQuery.data.data : []}
        isLoading={orderQuery.isLoading}
      />
    </div>
  );
};

export default Order;
