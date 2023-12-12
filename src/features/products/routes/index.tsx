import { Navigate, Route, Routes } from "react-router-dom";

import Produits from "./Produits";
import ProduitDetail from "./ProduitDetail";
import ProduitAdd from "./ProduitAdd";

export const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Produits />} />
      <Route path={"detail/:id"} element={<ProduitDetail />} />
      <Route path={"add"} element={<ProduitAdd />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
