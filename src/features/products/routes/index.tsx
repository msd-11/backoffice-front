import { Navigate, Route, Routes } from "react-router-dom";

import Produits from "./Produits";
import ProduitDetail from "./ProduitDetail";

export const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Produits />} />
      <Route path={":id"} element={<ProduitDetail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
