import { axios } from "@/lib/axios";
import { ProductStockResponse } from "../types";

export const getProductStock = (): Promise<ProductStockResponse> => {
  return axios.get(`/product/stocks`);
};
