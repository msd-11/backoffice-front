import { axios } from "@/lib/axios";

import { Blog, BlogResponse } from "../types";

export const addBlog = (blog: Blog): Promise<BlogResponse> => {
  return axios.post(`/blogs`, blog);
};
