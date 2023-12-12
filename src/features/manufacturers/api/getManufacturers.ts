import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { ManufacturerListResponse } from "../types";

export const getManufacturers = (): Promise<ManufacturerListResponse> => {
  return axios.get(`/manufacturer`);
};

type QueryFnType = typeof getManufacturers;

export const useManufacturers = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["manufacturers"],
    queryFn: () => getManufacturers(),
  });
};
