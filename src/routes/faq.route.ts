// src/routes/faq.routes.ts
import { Router } from "express";
import {
  createFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
} from "../controllers/faq.controller";
import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: Frequently Asked Questions APIs
 */

/**
 * @swagger
 * /api/faqs:
 *   get:
 *     summary: Get FAQs (public)
 *     tags: [FAQ]
 *     parameters:
 *       - in: query
 *         name: all
 *         schema:
 *           type: boolean
 *           example: false
 *         description: Set true to get inactive FAQs (Admin)
 *     responses:
 *       200:
 *         description: List of FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FAQ'
 */
router.get("/", getFaqs);

/**
 * @swagger
 * /api/faqs/{id}:
 *   get:
 *     summary: Get FAQ by ID (Admin only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 661c0c9b34f0a1f9d9a11111
 *     responses:
 *       200:
 *         description: FAQ details
 */
router.get("/:id", protect, adminOnly, getFaqById);

/**
 * @swagger
 * /api/faqs:
 *   post:
 *     summary: Create FAQ (Admin only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             question: "What is Lalpurja?"
 *             answer: "Lalpurja is a legal land ownership document in Nepal."
 *             isActive: true
 *     responses:
 *       201:
 *         description: FAQ created successfully
 */
router.post("/", protect, adminOnly, createFaq);

/**
 * @swagger
 * /api/faqs/{id}:
 *   put:
 *     summary: Update FAQ (Admin only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 661c0c9b34f0a1f9d9a11111
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             question: "Updated question?"
 *             answer: "Updated answer"
 *             isActive: false
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 */
router.put("/:id", protect, adminOnly, updateFaq);

/**
 * @swagger
 * /api/faqs/{id}:
 *   delete:
 *     summary: Delete FAQ (Admin only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 661c0c9b34f0a1f9d9a11111
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 */
router.delete("/:id", protect, adminOnly, deleteFaq);

export default router;
