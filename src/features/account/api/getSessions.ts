import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import {
  IpInfoResponse,
  Session,
  SessionFinal,
  SessionResponse,
} from "../types";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const getSessions = (): Promise<SessionResponse> => {
  return axios.get("/sessions");
};

export const getIpInfo = (ip: string): Promise<IpInfoResponse> => {
  return Axios.get(`http://ip-api.com/json/${ip}`);
};

type QueryFnType = () => Promise<SessionFinal[]>;

type UseSessionsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useSessions = ({ config }: UseSessionsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["sessions"],
    queryFn: async () => {
      const sessionsResponse = await getSessions();

      return Promise.all(
        sessionsResponse.data.map(async (value: Session) => {
          const ipData: IpInfoResponse = await getIpInfo(value.ip);
          const sessionFinal: SessionFinal = {
            ...value,
            ...ipData.data,
          };

          return sessionFinal;
        })
      );
    },
  });
};
