import mongoose from "mongoose";

import { Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  description: string;
  purpose: "SALE" | "RENT";
  propertyType: "RESIDENTIAL" | "COMMERCIAL" | "LAND";
  price: number;
  negotiable: boolean;
  area: {
    value: number;
    unit: "AANA" | "ROPANI" | "KATHA" | "DHUR";
  };
  city: string;
  areaName: string;
  municipality: string;
  wardNo: number;
  roadType?: "BLACKTOPPED" | "GRAVEL" | "EARTH";
  roadAccess?: number;
  ringRoadDistance?: number;
  propertyFace?: 
    | "NORTH"
    | "SOUTH"
    | "EAST"
    | "WEST"
    | "NORTH_EAST"
    | "NORTH_WEST"
    | "SOUTH_EAST"
    | "SOUTH_WEST";
  images: string[];
  documents?: {
    lalpurja?: string;
    traceMap?: string;
  };
  status: "AVAILABLE" | "SOLD" | "RESERVED";
  datePosted: Date;
  isVerified: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["SALE", "RENT"],
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["RESIDENTIAL", "COMMERCIAL", "LAND"],
      required: true,
    },

    // ================= PRICE =================
    price: {
      type: Number, // store in NPR
      required: true,
    },

    negotiable: {
      type: Boolean,
      default: false,
    },

    // ================= AREA =================
    area: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["AANA", "ROPANI", "KATHA", "DHUR"],
        required: true,
      },
    },

    // ================= LOCATION =================
    city: {
      type: String,
      required: true, // Bhaktapur
    },

    areaName: {
      type: String,
      required: true, // Suryabinayak
    },

    municipality: {
      type: String,
      required: true,
    },

    wardNo: {
      type: Number,
      required: true,
    },

    // ================= ROAD & ACCESS =================
    roadType: {
      type: String,
      enum: ["BLACKTOPPED", "GRAVEL", "EARTH"],
    },

    roadAccess: {
      type: Number, // in feet
    },

    ringRoadDistance: {
      type: Number, // in km
    },

    propertyFace: {
      type: String,
      enum: [
        "NORTH",
        "SOUTH",
        "EAST",
        "WEST",
        "NORTH_EAST",
        "NORTH_WEST",
        "SOUTH_EAST",
        "SOUTH_WEST",
      ],
    },

    // ================= MEDIA =================
    images: [String],

    // documents: {
    //   lalpurja: String,
    //   traceMap: String,
    // },

    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD", "RESERVED"],
      default: "AVAILABLE",
    },

    datePosted: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
