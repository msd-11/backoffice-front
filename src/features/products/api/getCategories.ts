import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";

import { CategoriesListResponse } from "../types";

export const getCategories = (): Promise<CategoriesListResponse> => {
  return axios.get(`/category`);
};

type QueryFnType = typeof getCategories;

export const useCategories = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
