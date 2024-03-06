import { axios } from "@/lib/axios";

interface SetRoleDTO {
  id: number;
}

export const setRoles = (roles: SetRoleDTO[], puid: string): Promise<void> => {
  return axios.put(`/employees/roles/${puid}`, { roles: roles });
};
