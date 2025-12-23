import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  getPropertyBySlug,
  updateProperty,
  deleteProperty,
  verifyProperty,
  updatePropertyStatus,
} from "../controllers/property.controller";
import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Property
 *   description: Property management APIs
 */

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get properties with filters, pagination, and search
 *     tags: [Property]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Number of items per page
 *         example: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: datePosted
 *         description: Field to sort by
 *         example: "datePosted"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *         example: "desc"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title, description, and area name
 *         example: "Kathmandu"
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *         example: "Bhaktapur"
 *       - in: query
 *         name: municipality
 *         schema:
 *           type: string
 *         description: Filter by municipality
 *         example: "Suryabinayak"
 *       - in: query
 *         name: wardNo
 *         schema:
 *           type: number
 *         description: Filter by ward number
 *         example: 5
 *       - in: query
 *         name: purpose
 *         schema:
 *           type: string
 *           enum: [SALE, RENT]
 *         description: Filter by property purpose
 *         example: "SALE"
 *       - in: query
 *         name: propertyType
 *         schema:
 *           type: string
 *           enum: [RESIDENTIAL, COMMERCIAL, LAND]
 *         description: Filter by property type
 *         example: "RESIDENTIAL"
 *       - in: query
 *         name: propertyFace
 *         schema:
 *           type: string
 *           enum: [NORTH, SOUTH, EAST, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST]
 *         description: Filter by property facing direction
 *         example: "EAST"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [AVAILABLE, SOLD, RESERVED]
 *         description: Filter by property status
 *         example: "AVAILABLE"
 *       - in: query
 *         name: isVerified
 *         schema:
 *           type: boolean
 *         description: Filter by verification status
 *         example: true
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter (in NPR)
 *         example: 5000000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter (in NPR)
 *         example: 20000000
 *     responses:
 *       200:
 *         description: List of properties with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       description: Total number of properties
 *                       example: 50
 *                     page:
 *                       type: number
 *                       description: Current page number
 *                       example: 1
 *                     limit:
 *                       type: number
 *                       description: Items per page
 *                       example: 10
 *                     totalPages:
 *                       type: number
 *                       description: Total number of pages
 *                       example: 5
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property MongoDB ObjectId
 *         example: 65fbc1a91d2c8a91a1e34c9a
 *     responses:
 *       200:
 *         description: Property data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getPropertyById);

/**
 * @swagger
 * /api/properties/slug/{slug}:
 *   get:
 *     summary: Get property by slug
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Property URL-friendly slug
 *         example: "luxury-villa-kathmandu"
 *     responses:
 *       200:
 *         description: Property data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/slug/:slug", getPropertyBySlug);

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - purpose
 *               - propertyType
 *               - price
 *               - area
 *               - city
 *               - areaName
 *               - municipality
 *               - wardNo
 *               - slug
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Luxury Villa in Kathmandu"
 *               description:
 *                 type: string
 *                 example: "Beautiful villa with mountain view and modern amenities"
 *               purpose:
 *                 type: string
 *                 enum: [SALE, RENT]
 *                 example: "SALE"
 *               propertyType:
 *                 type: string
 *                 enum: [RESIDENTIAL, COMMERCIAL, LAND]
 *                 example: "RESIDENTIAL"
 *               price:
 *                 type: number
 *                 example: 15000000
 *               negotiable:
 *                 type: boolean
 *                 example: true
 *               area:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                     example: 5
 *                   unit:
 *                     type: string
 *                     enum: [AANA, ROPANI, KATHA, DHUR]
 *                     example: "AANA"
 *               city:
 *                 type: string
 *                 example: "Kathmandu"
 *               areaName:
 *                 type: string
 *                 example: "Boudha"
 *               municipality:
 *                 type: string
 *                 example: "Kathmandu Metropolitan"
 *               wardNo:
 *                 type: number
 *                 example: 6
 *               roadType:
 *                 type: string
 *                 enum: [BLACKTOPPED, GRAVEL, EARTH]
 *                 example: "BLACKTOPPED"
 *               roadAccess:
 *                 type: number
 *                 example: 20
 *               ringRoadDistance:
 *                 type: number
 *                 example: 2.5
 *               propertyFace:
 *                 type: string
 *                 enum: [NORTH, SOUTH, EAST, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST]
 *                 example: "EAST"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: New image files to upload (supports multiple files)
 *               slug:
 *                 type: string
 *                 example: "luxury-villa-kathmandu-boudha"
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Property created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", protect, adminOnly, createProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update property with file upload support (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property MongoDB ObjectId
 *         example: 65fbc1a91d2c8a91a1e34c9a
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Luxury Villa"
 *               description:
 *                 type: string
 *                 example: "Renovated villa with premium finishes"
 *               purpose:
 *                 type: string
 *                 enum: [SALE, RENT]
 *                 example: "SALE"
 *               propertyType:
 *                 type: string
 *                 enum: [RESIDENTIAL, COMMERCIAL, LAND]
 *                 example: "RESIDENTIAL"
 *               price:
 *                 type: number
 *                 example: 17000000
 *               negotiable:
 *                 type: boolean
 *                 example: false
 *               area:
 *                 type: string
 *                 description: JSON string of area object
 *                 example: '{"value": 6, "unit": "AANA"}'
 *               city:
 *                 type: string
 *                 example: "Kathmandu"
 *               areaName:
 *                 type: string
 *                 example: "Boudha"
 *               municipality:
 *                 type: string
 *                 example: "Kathmandu Metropolitan"
 *               wardNo:
 *                 type: number
 *                 example: 6
 *               roadType:
 *                 type: string
 *                 enum: [BLACKTOPPED, GRAVEL, EARTH]
 *                 example: "BLACKTOPPED"
 *               roadAccess:
 *                 type: number
 *                 example: 25
 *               ringRoadDistance:
 *                 type: number
 *                 example: 2.0
 *               propertyFace:
 *                 type: string
 *                 enum: [NORTH, SOUTH, EAST, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST]
 *                 example: "SOUTH_EAST"
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, SOLD, RESERVED]
 *                 example: "AVAILABLE"
 *               removedImages:
 *                 type: string
 *                 description: JSON array of image URLs to remove from Cloudinary
 *                 example: '["https://res.cloudinary.com/demo/old-image1.jpg", "https://res.cloudinary.com/demo/old-image2.jpg"]'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: New image files to upload (supports multiple files)
 *     responses:
 *       200:
 *         description: Property updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Property updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", protect, adminOnly, updateProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete property (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property MongoDB ObjectId
 *         example: 65fbc1a91d2c8a91a1e34c9a
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Property deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", protect, adminOnly, deleteProperty);

/**
 * @swagger
 * /api/properties/{id}/verify:
 *   patch:
 *     summary: Verify property (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property MongoDB ObjectId
 *         example: 65fbc1a91d2c8a91a1e34c9a
 *     responses:
 *       200:
 *         description: Property verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Property verified successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id/verify", protect, adminOnly, verifyProperty);

/**
 * @swagger
 * /api/properties/{id}/status:
 *   patch:
 *     summary: Update property status (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property MongoDB ObjectId
 *         example: 65fbc1a91d2c8a91a1e34c9a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, SOLD, RESERVED]
 *                 description: New property status
 *                 example: "SOLD"
 *     responses:
 *       200:
 *         description: Property status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Property status updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request - invalid status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id/status", protect, adminOnly, updatePropertyStatus);

export default router;