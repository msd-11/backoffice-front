import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { ResetForm } from "../components/ResetForm";
import { PasswordReset } from "./PasswordReset";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/reset/:token" element={<PasswordReset />} />
      <Route path="" element={<Login />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
