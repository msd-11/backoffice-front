import * as React from "react";
import { useEmployees } from "../api/getEmployees";
import { DataTable } from "../components/dataTable";
import { columns } from "../components/columns";
import { useRoles } from "../api/getRoles";

interface IProps {}

const Employees: React.FC<IProps> = () => {
  const employeesQuery = useEmployees();
  const roles = useRoles();

  return (
    <div className="p-4">
      {roles.isLoading ? null : (
        <DataTable
          columns={columns(roles.data?.data)}
          data={employeesQuery.data ? employeesQuery.data.data : []}
          isLoading={employeesQuery.isLoading}
        />
      )}
    </div>
  );
};

export default Employees;
