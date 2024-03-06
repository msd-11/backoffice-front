import { axios } from "@/lib/axios";
import { OrderListResponse } from "../types";

interface ProcessOrderDTO {
  id: number;
}

export const shipOrder = (
  data: ProcessOrderDTO
): Promise<OrderListResponse> => {
  return axios.put(`/order/shipping/${data.id}`);
};
