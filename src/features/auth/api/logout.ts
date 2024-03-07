import { axios } from "@/lib/axios";

export const logout = (): Promise<void> => {
  return axios.delete("/sessions");
};
