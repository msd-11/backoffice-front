import { axios } from "@/lib/axios";

import { Product, ProductListResponse } from "../types";

export const updateProduct = (
  product: Product
): Promise<ProductListResponse> => {
  return axios.put(`/product/${product.id}`, product);
};
