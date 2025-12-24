// src/services/review.service.ts
import { Review, IReview } from "../models/Review";

export const createReviewService = async (data: Partial<IReview>) => {
  return Review.create(data);
};

export const getAllReviewsService = async () => {
  return Review.find({ isActive: true }).sort({ createdAt: -1 });
};

export const getReviewByIdService = async (id: string) => {
  return Review.findById(id);
};

export const updateReviewService = async (
  id: string,
  data: Partial<IReview>
) => {
  return Review.findByIdAndUpdate(id, data, { new: true });
};

export const deleteReviewService = async (id: string) => {
  return Review.findByIdAndDelete(id);
};
