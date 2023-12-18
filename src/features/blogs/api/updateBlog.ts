import { axios } from "@/lib/axios";

import { Blog } from "../types";

export const updateBlog = (blog: Blog): Promise<void> => {
  return axios.put(`/blogs/${blog.id}`, blog);
};
