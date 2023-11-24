import { Navigate, Route, Routes } from "react-router-dom";
import Account from "./Account";
import Sessions from "./Sessions";

export const AccountRoutes = () => {
  return (
    <Routes>
      <Route path={"/sessions"} element={<Sessions />} />
      <Route path={""} element={<Account />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
