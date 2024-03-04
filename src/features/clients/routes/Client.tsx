import { useClients } from "../api/getClients";
import { columns } from "../components/columns";
import { DataTable } from "../components/dataTable";

interface IProps {}

const Client: React.FC<IProps> = () => {
  const clientQuery = useClients();

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={clientQuery.data ? clientQuery.data.data : []}
        isLoading={clientQuery.isLoading}
      />
    </div>
  );
};

export default Client;
