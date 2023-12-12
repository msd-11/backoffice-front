import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { lazyImport } from "@/utils/lazyImport";
import { AccountRoutes } from "@/features/account/routes";

const { ProductsRoutes } = lazyImport(
  () => import("@/features/products"),
  "ProductsRoutes"
);

const { ManufacturerRoutes } = lazyImport(
  () => import("@/features/manufacturers"),
  "ManufacturerRoutes"
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
  { path: "/account/*", element: <AccountRoutes /> },
  { path: "/manufacturer/*", element: <ManufacturerRoutes /> },
  { path: "/", element: <div>Home</div> },
  { path: "*", element: <Navigate to="." /> },
];
