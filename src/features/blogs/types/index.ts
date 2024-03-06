export type BlogListResponse = {
  statusCode: number;
  data: Blog[];
};

export type Blog = {
  id: number;
  slug: string;
  title: string;
  author: number;
  bannerPath: string;
  category: string;
  createdAt: string;
  lastUpdatedAt: string;
  content: string;
  visible: boolean;
};

export type BlogResponse = {
  statusCode: number;
  data: Blog;
};
