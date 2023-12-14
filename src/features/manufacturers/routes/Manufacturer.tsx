import { useManufacturers } from "../api/getManufacturers";
import { columns } from "../components/columns";
import { DataTable } from "../components/dataTable";

interface IProps {}

const Manufacturer: React.FC<IProps> = () => {
  const manufacturerQuery = useManufacturers();

  if (manufacturerQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!manufacturerQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={manufacturerQuery.data.data} />
    </div>
  );
};

export default Manufacturer;
