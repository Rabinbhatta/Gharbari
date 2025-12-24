// src/routes/review.routes.ts
import { Router } from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";
import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Customer reviews & testimonials
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 */
router.get("/", getReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID (Admin)
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", protect, adminOnly, getReviewById);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create review (Admin only)
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Suman Shrestha"
 *             role: "Property Buyer"
 *             message: "Excellent service and very transparent."
 *             rating: 5
 *             isActive: true
 */
router.post("/", protect, adminOnly, createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update review (Admin only)
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, adminOnly, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review (Admin only)
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, adminOnly, deleteReview);

export default router;
