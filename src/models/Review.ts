// src/models/review.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  role?: string;
  message: string;
  rating: number;
  image?: string;
  isActive: boolean;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      trim: true, // e.g. Buyer, Seller
    },

    message: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    image: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
