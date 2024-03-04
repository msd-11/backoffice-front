import * as React from "react";
import { useEmployees } from "../api/getEmployees";
import { DataTable } from "../components/dataTable";
import { columns } from "../components/columns";

interface IProps {}

const Employees: React.FC<IProps> = () => {
  const employeesQuery = useEmployees();

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={employeesQuery.data ? employeesQuery.data.data : []}
        isLoading={employeesQuery.isLoading}
      />
    </div>
  );
};

export default Employees;
