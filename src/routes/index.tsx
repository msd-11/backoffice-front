import { useRoutes } from "react-router-dom";

import { useUser } from "@/lib/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import Sidebar from "@/components/Sidebar";

export const AppRoutes = () => {
  const user = useUser();

  const routes = user.data ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  if (user.data) {
    return (
      <>
        <Sidebar />
        <main className="bg-main-background h-screen w-screen relative overflow-auto p-4">
          {element}
        </main>
      </>
    );
  } else {
    return <>{element}</>;
  }
};
