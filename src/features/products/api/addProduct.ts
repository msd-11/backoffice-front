import { axios } from "@/lib/axios";

import { Product, ProductListResponse } from "../types";

export const addProduct = (product: Product): Promise<ProductListResponse> => {
  return axios.post(`/product`, product);
};
