import { axios } from "@/lib/axios";

import { ProductItem } from "../types";

export const addProductItem = (product: ProductItem): Promise<void> => {
  return axios.post(`/productItem`, product);
};
