import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { BlogListResponse } from "../types";

export const getBlogs = (): Promise<BlogListResponse> => {
  return axios.get(`/blogs/confidential`);
};

type QueryFnType = typeof getBlogs;

export const useBlogs = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });
};
