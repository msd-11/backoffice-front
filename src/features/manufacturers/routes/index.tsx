import { Navigate, Route, Routes } from "react-router-dom";
import ManufacturerDetail from "./ManufacturerDetail";
import Manufacturer from "./Manufacturer";
import ManufacturerAdd from "./ManufacturerAdd";

export const ManufacturerRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Manufacturer />} />
      <Route path={"/detail/:id"} element={<ManufacturerDetail />} />
      <Route path={"add"} element={<ManufacturerAdd />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
