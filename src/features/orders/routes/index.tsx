import { Navigate, Route, Routes } from "react-router-dom";
import Order from "./Order";
import OrderDetail from "./OrderDetail";

export const OrderRoutes = () => {
  return (
    <Routes>
      <Route path={"detail"} element={<OrderDetail />} />
      <Route path={""} element={<Order />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
