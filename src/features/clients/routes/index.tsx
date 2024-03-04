import { Navigate, Route, Routes } from "react-router-dom";
import Client from "./Client";

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Client />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
