import { Navigate, Route, Routes } from "react-router-dom";

import Blogs from "./Blogs";
import BlogDetail from "./BlogDetail";

export const BlogsRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Blogs />} />
      <Route path={"/detail/:id"} element={<BlogDetail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
