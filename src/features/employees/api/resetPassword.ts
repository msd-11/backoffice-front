import { axios } from "@/lib/axios";

export interface ResetPasswordDTO {
  email: string;
}

export const resetPassword = (employee: ResetPasswordDTO): Promise<void> => {
  return axios.post(`/employees/reset`, employee);
};
