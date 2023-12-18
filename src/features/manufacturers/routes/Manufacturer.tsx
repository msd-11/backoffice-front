import { useManufacturers } from "../api/getManufacturers";
import { columns } from "../components/columns";
import { DataTable } from "../components/dataTable";

interface IProps {}

const Manufacturer: React.FC<IProps> = () => {
  const manufacturerQuery = useManufacturers();

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={manufacturerQuery.data ? manufacturerQuery.data.data : []}
        isLoading={manufacturerQuery.isLoading}
      />
    </div>
  );
};

export default Manufacturer;
