// src/controllers/review.controller.ts
import { Request, Response } from "express";
import {
  createReviewService,
  getAllReviewsService,
  getReviewByIdService,
  updateReviewService,
  deleteReviewService,
} from "../services/review.service";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary";

// CREATE REVIEW (ADMIN)
export const createReview = async (req: Request, res: Response) => {
  let imageUrl = req.body.image;

  if (req.file?.path) {
    imageUrl = await uploadToCloudinary(req.file.path);
  }

  const review = await createReviewService({
    ...req.body,
    image: imageUrl,
  });

  res.status(201).json({
    success: true,
    message: "Review created",
    data: review,
  });
};

// GET ALL REVIEWS (PUBLIC)
export const getReviews = async (_req: Request, res: Response) => {
  const reviews = await getAllReviewsService();

  res.json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
};

// GET REVIEW BY ID (ADMIN)
export const getReviewById = async (req: Request, res: Response) => {
  const review = await getReviewByIdService(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json({
    success: true,
    data: review,
  });
};

// UPDATE REVIEW (ADMIN)
export const updateReview = async (req: Request, res: Response) => {
  const existing = await getReviewByIdService(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (req.file?.path) {
    if (existing.image) {
      await deleteFromCloudinary(existing.image);
    }
    req.body.image = await uploadToCloudinary(req.file.path);
  }

  const updated = await updateReviewService(req.params.id, req.body);

  res.json({
    success: true,
    message: "Review updated",
    data: updated,
  });
};

// DELETE REVIEW (ADMIN)
export const deleteReview = async (req: Request, res: Response) => {
  const review = await getReviewByIdService(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (review.image) {
    await deleteFromCloudinary(review.image);
  }

  await deleteReviewService(req.params.id);

  res.json({
    success: true,
    message: "Review deleted",
  });
};
