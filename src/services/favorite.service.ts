import Favorite from "../models/Favorite";

export const addFavorite = async (userId: string, propertyId: string) => {
  return Favorite.create({
    user: userId,
    property: propertyId,
  });
};

export const removeFavorite = async (
  userId: string,
  propertyId: string
) => {
  return Favorite.findOneAndDelete({
    user: userId,
    property: propertyId,
  });
};

export const getMyFavorites = async (userId: string) => {
  return Favorite.find({ user: userId })
    .populate("property")
    .sort({ createdAt: -1 });
};
