// src/services/blog.service.ts
import { Blog, IBlog } from "../models/Blog";

export const createBlogService = async (data: Partial<IBlog>) => {
  return Blog.create(data);
};

export const getBlogsService = async (
  page = 1,
  limit = 10,
  search?: string
) => {
  const skip = (page - 1) * limit;

  const query: any = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(query);

  return { blogs, total };
};

export const getBlogByIdService = async (id: string) => {
  return Blog.findById(id);
};

export const getBlogBySlugService = async (slug: string) => {
  return Blog.findOne({ slug });
};

export const updateBlogService = async (
  id: string,
  data: Partial<IBlog>
) => {
  return Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlogService = async (id: string) => {
  return Blog.findByIdAndDelete(id);
};
