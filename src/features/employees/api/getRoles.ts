import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { RolesResponse } from "../types";

export const getRoles = (): Promise<RolesResponse> => {
  return axios.get(`/roles`);
};

type QueryFnType = typeof getRoles;

export const useRoles = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["roles"],
    queryFn: () => getRoles(),
  });
};
