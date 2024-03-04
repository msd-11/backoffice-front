import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Dashboard />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
