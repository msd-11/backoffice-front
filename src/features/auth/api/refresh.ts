import { axios } from "@/lib/axios";

import { RefreshResponse } from "../types";

export type RefreshTokenDTO = {
  "access-token": string;
  "refresh-token": string;
};

export const refreshToken = (
  data: RefreshTokenDTO
): Promise<RefreshResponse> => {
  return axios.post("/sessions/refresh", data);
};
