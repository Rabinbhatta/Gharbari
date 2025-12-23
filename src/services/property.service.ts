import Property from "../models/Property";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";

export const createProperty = async (data: any, files?: any) => {
  let images: string[] = [];

  if (files?.images) {
    const imageFiles = Array.isArray(files.images)
      ? files.images
      : [files.images];

    for (const file of imageFiles) {
      const imageUrl = await uploadToCloudinary(file.tempFilePath);
      images.push(imageUrl);
    }
  }

  return Property.create({
    ...data,
    images,
  });
};

export const getProperties = async (query: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "datePosted",
    sortOrder = "desc",
    search,
  } = query;

  const filter: any = {};

  if (query.city) filter.city = query.city;
  if (query.municipality) filter.municipality = query.municipality;
  if (query.wardNo) filter.wardNo = Number(query.wardNo);
  if (query.purpose) filter.purpose = query.purpose;
  if (query.propertyType) filter.propertyType = query.propertyType;
  if (query.propertyFace) filter.propertyFace = query.propertyFace;
  if (query.status) filter.status = query.status;
  if (query.isVerified !== undefined)
    filter.isVerified = query.isVerified === "true";

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { areaName: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;
  const sort: any = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [data, total] = await Promise.all([
    Property.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Property.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getPropertyById = async (id: string) => {
  return Property.findById(id);
};

export const getPropertyBySlug = async (slug: string) => {
  return Property.findOne({ slug });
};

export const updateProperty = async (
  id: string,
  data: any,
  files?: any
) => {
  const property = await Property.findById(id);
  if (!property) throw new Error("Property not found");

  let updatedImages = property.images;

  // 🧹 DELETE REMOVED IMAGES
  if (data.removedImages) {
    let removedImages: string[] = [];
    
    // Handle both JSON string and regular string
    try {
      // Try parsing as JSON first
      removedImages = JSON.parse(data.removedImages);
    } catch (error) {
      // If parsing fails, check if it's a comma-separated string
      if (typeof data.removedImages === 'string') {
        removedImages = data.removedImages.split(',').map((img: string) => img.trim());
      } else if (Array.isArray(data.removedImages)) {
        // If it's already an array, use it directly
        removedImages = data.removedImages;
      }
    }

    // Delete images from Cloudinary
    for (const image of removedImages) {
      if (image) { // Check if image URL is not empty
        await deleteFromCloudinary(image);
      }
    }

    // Filter out removed images
    updatedImages = updatedImages.filter(
      (img) => !removedImages.includes(img)
    );
  }

  // ⬆️ UPLOAD NEW IMAGES
  if (files?.images) {
    const imageFiles = Array.isArray(files.images)
      ? files.images
      : [files.images];

    for (const file of imageFiles) {
      const imageUrl = await uploadToCloudinary(file.tempFilePath);
      updatedImages.push(imageUrl);
    }
  }

  // Parse area if it's a JSON string
  if (data.area && typeof data.area === 'string') {
    try {
      data.area = JSON.parse(data.area);
    } catch (error) {
      console.error('Error parsing area:', error);
    }
  }

  // Parse documents if it's a JSON string
  if (data.documents && typeof data.documents === 'string') {
    try {
      data.documents = JSON.parse(data.documents);
    } catch (error) {
      console.error('Error parsing documents:', error);
    }
  }

  property.set({
    ...data,
    images: updatedImages,
  });

  await property.save();
  return property;
};

export const deleteProperty = async (id: string) => {
  return Property.findByIdAndDelete(id);
};

export const verifyProperty = async (id: string) => {
  return Property.findByIdAndUpdate(
    id,
    { isVerified: true },
    { new: true }
  );
};

export const updatePropertyStatus = async (
  id: string,
  status: string
) => {
  return Property.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};
