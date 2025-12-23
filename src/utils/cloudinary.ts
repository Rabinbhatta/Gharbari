import cloudinary from "../config/cloudinary";

export const deleteFromCloudinary = async (url:string) => {
  try {
  const publicId = url.match(/\/v\d+\/([A-Za-z0-9_-]+)\.[A-Za-z]+$/);
  const id = publicId ? publicId[1] : null;
  if (!id) {
    throw new Error("Invalid image URL");
  }
    await cloudinary.v2.uploader.destroy(id);
    console.log(`Image with public ID "${publicId}" deleted from Cloudinary.`);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
    throw new Error("Cloudinary deletion failed");
  }
};

interface CloudinaryUploadResult {
    secure_url: string;
}

export const uploadToCloudinary = async (tempFilePath: string): Promise<string> => {
    try {
        const result: CloudinaryUploadResult = await cloudinary.v2.uploader.upload(tempFilePath);

        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Image upload failed");
    }
};