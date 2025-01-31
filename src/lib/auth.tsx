import { configureAuth } from "react-query-auth";

import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from "@/features/auth";
import storage from "@/utils/storage";
import { logout } from "@/features/auth/api/logout";

async function handleUserResponse(dataResponse: UserResponse) {
  const { data } = dataResponse;
  storage.setToken(data["access-token"], data["refresh-token"]);
  return data["access-token"];
}

async function userFn() {
  if (storage.getToken()) {
    const data = storage.getToken();
    //   const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  try {
    await logout();
    storage.clearToken();
  } catch (e) {
    storage.clearToken();
  }
}

const authConfig = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p>Loading</p>
      </div>
    );
  },
};

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth<
    AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    RegisterCredentialsDTO
  >(authConfig);
