import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";

import { ManufacturerResponse } from "../types";

export const getManufacturer = (
  manufacturerId: number
): Promise<ManufacturerResponse> => {
  return axios.get(`/manufacturer/${manufacturerId}`);
};

type QueryFnType = typeof getManufacturer;

type UseManufacturerOptions = {
  manufacturerId: number;
};

export const useManufacturer = ({ manufacturerId }: UseManufacturerOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["manufacturer", manufacturerId],
    queryFn: () => getManufacturer(manufacturerId),
  });
};
