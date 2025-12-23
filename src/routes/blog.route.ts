// src/routes/blog.routes.ts
import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management APIs
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: real estate
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get("/", getBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 661b8b17f94a0d22c2e9f999
 *     responses:
 *       200:
 *         description: Blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
router.get("/:id", getBlogById);

/**
 * @swagger
 * /api/blogs/slug/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         example: real-estate-investment-nepal
 *     responses:
 *       200:
 *         description: Blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
router.get("/slug/:slug", getBlogBySlug);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog (Admin only)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Real Estate Investment in Nepal"
 *             content: "<p>Blog content here...</p>"
 *             author: "Admin"
 *             image: "https://res.cloudinary.com/demo/image/upload/v1/blog.jpg"
 *             isPublished: true
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
router.post("/", protect, adminOnly, createBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update blog (Admin only)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 661b8b17f94a0d22c2e9f999
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: "Updated Blog Title"
 *             content: "<p>Updated content</p>"
 *             image: "https://res.cloudinary.com/demo/image/upload/v1/new.jpg"
 *             isPublished: false
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
router.put("/:id", protect, adminOnly, updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete blog (Admin only)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 661b8b17f94a0d22c2e9f999
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;
