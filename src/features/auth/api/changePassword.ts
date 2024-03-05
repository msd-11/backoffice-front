import { axios } from "@/lib/axios";

import { AuthUser } from "../types";

export type ChangePasswordDTO = {
  token: string;
  password: string;
};

export const changePassword = (data: ChangePasswordDTO): Promise<AuthUser> => {
  return axios.post(`/employees/reset/${data.token}`, {
    password: data.password,
  });
};
