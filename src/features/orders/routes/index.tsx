import { Navigate, Route, Routes } from "react-router-dom";
import Order from "./Order";

export const OrderRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Order />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
