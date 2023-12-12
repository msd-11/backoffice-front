import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";

import { ProductListResponse } from "../types";

export const getProduct = (productId: number): Promise<ProductListResponse> => {
  return axios.get(`/product/${productId}`);
};

type QueryFnType = typeof getProduct;

type UseProductOptions = {
  productId: number;
};

export const useProduct = ({ productId }: UseProductOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });
};
