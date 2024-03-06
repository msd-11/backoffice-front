import { axios } from "@/lib/axios";
import { OrderListResponse } from "../types";

interface ProcessOrderDTO {
  id: number;
}

export const shippedOrder = (
  data: ProcessOrderDTO
): Promise<OrderListResponse> => {
  return axios.put(`/order/shipped/${data.id}`);
};
