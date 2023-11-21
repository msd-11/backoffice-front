import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { lazyImport } from "@/utils/lazyImport";

const { ProductsRoutes } = lazyImport(
  () => import("@/features/products"),
  "ProductsRoutes"
);

const App = () => {
  return (
    <main
      className={"bg-main-background h-screen w-screen relative overflow-auto"}
    >
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <p>Loading</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </main>
  );
};

export const protectedRoutes = [
  { path: "/produits/*", element: <ProductsRoutes /> },
  { path: "/", element: <div>Home</div> },
  { path: "*", element: <Navigate to="." /> },
];
