// src/controllers/blog.controller.ts
import { Request, Response } from "express";
import slugify from "slugify";
import {
  createBlogService,
  getBlogsService,
  getBlogByIdService,
  getBlogBySlugService,
  updateBlogService,
  deleteBlogService,
} from "../services/blog.service";

// CREATE
export const createBlog = async (req: Request, res: Response) => {
  const { title } = req.body;

  const slug = slugify(title, { lower: true, strict: true });

  const blog = await createBlogService({
    ...req.body,
    slug,
  });

  res.status(201).json({
    success: true,
    data: blog,
  });
};

// READ ALL
export const getBlogs = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string;

  const { blogs, total } = await getBlogsService(page, limit, search);

  res.json({
    success: true,
    total,
    page,
    data: blogs,
  });
};

// READ BY ID
export const getBlogById = async (req: Request, res: Response) => {
  const blog = await getBlogByIdService(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json({ success: true, data: blog });
};

// READ BY SLUG
export const getBlogBySlug = async (req: Request, res: Response) => {
  const blog = await getBlogBySlugService(req.params.slug);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json({ success: true, data: blog });
};

// UPDATE
export const updateBlog = async (req: Request, res: Response) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  const blog = await updateBlogService(req.params.id, req.body);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json({ success: true, data: blog });
};

// DELETE
export const deleteBlog = async (req: Request, res: Response) => {
  const blog = await deleteBlogService(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json({ success: true, message: "Blog deleted successfully" });
};
