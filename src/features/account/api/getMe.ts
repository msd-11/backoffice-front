import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { EmployeeResponse } from "@/features/employees/types";

export const getMe = (): Promise<EmployeeResponse> => {
  return axios.get(`/employees/me`);
};

type QueryFnType = typeof getMe;

export const useMe = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
};
