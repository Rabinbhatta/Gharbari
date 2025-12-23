import { Response, NextFunction } from "express";
import * as favoriteService from "../services/favorite.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const addFavorite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await favoriteService.addFavorite(
      req.user!.id,
      req.params.propertyId
    );
    res.status(201).json({ message: "Added to favorites" });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already in favorites" });
    }
    next(err);
  }
};

export const removeFavorite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await favoriteService.removeFavorite(
      req.user!.id,
      req.params.propertyId
    );
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    next(err);
  }
};

export const getMyFavorites = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const favorites = await favoriteService.getMyFavorites(req.user!.id);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};
