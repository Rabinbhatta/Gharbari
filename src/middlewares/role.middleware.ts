import { Response, NextFunction } from "express";
import User from "../models/User";
import { AuthRequest } from "./auth.middleware";

export const adminOnly = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user?.id);
  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
