import { Navigate, Route, Routes } from "react-router-dom";
import ManufacturerDetail from "./ManufacturerDetail";
import Manufacturer from "./Manufacturer";

export const ManufacturerRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Manufacturer />} />
      <Route path={"/:id"} element={<ManufacturerDetail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
