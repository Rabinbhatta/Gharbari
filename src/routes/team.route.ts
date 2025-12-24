// src/routes/team.routes.ts
import { Router } from "express";
import {
  createTeam,
  getTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller";
import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Our team management APIs
 */

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all team members
 *     tags: [Team]
 */
router.get("/", getTeam);

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Get team member by ID
 *     tags: [Team]
 */
router.get("/:id", getTeamById);

/**
 * @swagger
 * /api/team:
 *   post:
 *     summary: Add team member (Admin)
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", protect, adminOnly, createTeam);

/**
 * @swagger
 * /api/team/{id}:
 *   put:
 *     summary: Update team member (Admin)
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, adminOnly, updateTeam);

/**
 * @swagger
 * /api/team/{id}:
 *   delete:
 *     summary: Delete team member (Admin)
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, adminOnly, deleteTeam);

export default router;
