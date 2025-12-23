import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },

  municipality: {
    type: String,
    required: true,
  },

  ward: {
    type: Number,
    required: true,
  },

  street: String,
});

export default mongoose.model("Location", locationSchema);
