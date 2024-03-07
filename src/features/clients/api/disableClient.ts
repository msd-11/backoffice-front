import { axios } from "@/lib/axios";

export interface DisableClientDTO {
  puid: string;
}

export const disableClient = (client: DisableClientDTO): Promise<void> => {
  return axios.post(`/customers/disable/${client.puid}`);
};
