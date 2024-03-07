import { Navigate, Route, Routes } from "react-router-dom";

import Produits from "./Produits";
import ProduitDetail from "./ProduitDetail";
import ProduitAdd from "./ProduitAdd";
import ProductItems from "./ProductItems";
import ProductItemsAdd from "./ProductItemsAdd";
import ProductItemDetail from "./ProductItemDetail";

export const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Produits />} />
      <Route path={"items/detail/:id/:refId"} element={<ProductItemDetail />} />
      <Route path={"items/add/:id"} element={<ProductItemsAdd />} />
      <Route path={"items/:id"} element={<ProductItems />} />
      <Route path={"detail/:id"} element={<ProduitDetail />} />
      <Route path={"add"} element={<ProduitAdd />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
