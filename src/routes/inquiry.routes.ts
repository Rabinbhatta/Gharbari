import { Router } from "express";
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiry.controller";
import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Inquiry
 *   description: Property inquiry APIs
 */

/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Create property inquiry
 *     tags: [Inquiry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             property: "65fbc1a91d2c8a91a1e34c9a"
 *             name: "Rabin Bhattarai"
 *             email: "rabin@example.com"
 *             phone: "9841234567"
 *             message: "I am interested in this property. Please contact me."
 *     responses:
 *       201:
 *         description: Inquiry created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createInquiry);

/**
 * @swagger
 * /api/inquiries:
 *   get:
 *     summary: Get all inquiries (Admin only)
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
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
 *         name: status
 *         schema:
 *           type: string
 *           example: "PENDING"
 *     responses:
 *       200:
 *         description: List of inquiries
 */
router.get("/", protect, adminOnly, getAllInquiries);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   get:
 *     summary: Get inquiry by ID (Admin only)
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 6601c0ab4fa2a3a8a8c2139f
 *     responses:
 *       200:
 *         description: Inquiry details
 *       404:
 *         description: Inquiry not found
 */
router.get("/:id", protect, adminOnly, getInquiryById);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   put:
 *     summary: Update inquiry status (Admin only)
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 6601c0ab4fa2a3a8a8c2139f
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "CONTACTED"
 *     responses:
 *       200:
 *         description: Inquiry updated successfully
 */
router.put("/:id", protect, adminOnly, updateInquiry);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   delete:
 *     summary: Delete inquiry (Admin only)
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 6601c0ab4fa2a3a8a8c2139f
 *     responses:
 *       200:
 *         description: Inquiry deleted successfully
 */
router.delete("/:id", protect, adminOnly, deleteInquiry);

export default router;
