import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";

import { BlogResponse } from "../types";

export const getBlog = (blogId: number): Promise<BlogResponse> => {
  return axios.get(`/blogs/confidential/${blogId}`);
};

type QueryFnType = typeof getBlog;

type UseBlogOptions = {
  blogId: number;
};

export const useBlog = ({ blogId }: UseBlogOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["blog", blogId],
    queryFn: () => getBlog(blogId),
  });
};
