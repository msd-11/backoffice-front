import { axios } from "@/lib/axios";
import { OrderListResponse } from "../types";

interface ProcessOrderDTO {
  id: number;
}

export const processOrder = (
  data: ProcessOrderDTO
): Promise<OrderListResponse> => {
  return axios.put(`/order/process/${data.id}`);
};
