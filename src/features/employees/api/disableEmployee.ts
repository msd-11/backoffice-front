import { axios } from "@/lib/axios";

export interface DisableEmployeeDTO {
  puid: string;
}

export const disableEmployee = (
  employee: DisableEmployeeDTO
): Promise<void> => {
  return axios.post(`/employees/disable/${employee.puid}`);
};
