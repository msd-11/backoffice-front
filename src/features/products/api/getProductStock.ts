import { axios } from "@/lib/axios";
import { ProductStockResponse } from "../types";

export const getProductStock = (id: number): Promise<ProductStockResponse> => {
  return axios.get(`/product/stock/${id}`);
};
