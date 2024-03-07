import { axios } from "@/lib/axios";
import { ProductItem } from "../types";

export const updateProductItem = (productItem: ProductItem): Promise<void> => {
  return axios.put(`/productItem/${productItem.id}`, productItem);
};
