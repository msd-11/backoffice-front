import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { ProductItemResponse } from "../types";

export const getProductItem = (
  itemId: string
): Promise<ProductItemResponse> => {
  return axios.get(`/productItem/${itemId}`);
};

type QueryFnType = typeof getProductItem;

type UseProductItemOptions = {
  itemId: string;
};

export const useProductItem = ({ itemId }: UseProductItemOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["productItem", itemId],
    queryFn: () => getProductItem(itemId),
  });
};
