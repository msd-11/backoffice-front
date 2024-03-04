import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { EmployeeListResponse } from "../types";

export const getEmployees = (): Promise<EmployeeListResponse> => {
  return axios.get(`/employees`);
};

type QueryFnType = typeof getEmployees;

export const useEmployees = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });
};
