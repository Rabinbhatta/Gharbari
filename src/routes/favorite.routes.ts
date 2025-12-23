import { Router } from "express";
import {
  addFavorite,
  removeFavorite,
  getMyFavorites,
} from "../controllers/favorite.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Saved properties (favorite) APIs
 */

/**
 * @swagger
 * /api/favorites/{propertyId}:
 *   post:
 *     summary: Add property to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         description: Property ID to add to favorites
 *         example: 65fbc1a91d2c8a91a1e34c9a
 *     responses:
 *       201:
 *         description: Property added to favorites
 *       400:
 *         description: Property already in favorites
 *       404:
 *         description: Property not found
 */
router.post("/:propertyId", protect, addFavorite);

/**
 * @swagger
 * /api/favorites/{propertyId}:
 *   delete:
 *     summary: Remove property from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         description: Property ID to remove from favorites
 *         example: 65fbc1a91d2c8a91a1e34c9a
 *     responses:
 *       200:
 *         description: Property removed from favorites
 *       404:
 *         description: Favorite not found
 */
router.delete("/:propertyId", protect, removeFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get my favorite properties
 *     tags: [Favorites]
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
 *     responses:
 *       200:
 *         description: List of favorite properties
 */
router.get("/", protect, getMyFavorites);

export default router;
