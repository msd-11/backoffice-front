import { axios } from "@/lib/axios";

export interface ResetPasswordDTO {
  email: string;
}

export const resetPassword = (client: ResetPasswordDTO): Promise<void> => {
  return axios.post(`/customers/reset`, client);
};
