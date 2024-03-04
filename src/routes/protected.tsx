import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AccountRoutes } from "@/features/account/routes";
import { BlogsRoutes } from "@/features/blogs/routes";
import { ProductsRoutes } from "@/features/products";
import { ManufacturerRoutes } from "@/features/manufacturers";
import { EmployeesRoutes } from "@/features/employees";
import { ClientRoutes } from "@/features/clients";
import { OrderRoutes } from "@/features/orders";

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
  { path: "/commandes/*", element: <OrderRoutes /> },
  { path: "/clients/*", element: <ClientRoutes /> },
  { path: "/employes/*", element: <EmployeesRoutes /> },
  { path: "/produits/*", element: <ProductsRoutes /> },
  { path: "/compte/*", element: <AccountRoutes /> },
  { path: "/blogs/*", element: <BlogsRoutes /> },
  { path: "/fournisseurs/*", element: <ManufacturerRoutes /> },
  { path: "/", element: <div>Home</div> },
  { path: "*", element: <Navigate to="." /> },
];
