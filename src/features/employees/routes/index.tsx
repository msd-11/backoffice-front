import { Navigate, Route, Routes } from "react-router-dom";
import Employees from "./Employees";
import EmployeeAdd from "./EmployeeAdd";

export const EmployeesRoutes = () => {
  return (
    <Routes>
      <Route path={"/add"} element={<EmployeeAdd />} />
      <Route path={""} element={<Employees />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
