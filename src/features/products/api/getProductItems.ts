import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { ProductItemListResponse } from "../types";

export const getProductItems = (
  productId: string
): Promise<ProductItemListResponse> => {
  return axios.get(`/productItem?product=${productId}`);
};

type QueryFnType = typeof getProductItems;

type UseProductOptions = {
  productId: string;
};

export const useProductItems = ({ productId }: UseProductOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["productItems", productId],
    queryFn: () => getProductItems(productId),
  });
};
