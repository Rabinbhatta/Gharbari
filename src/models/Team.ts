// src/models/team.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  image: string;
  title: string;
  isActive: boolean;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>("Team", TeamSchema);
