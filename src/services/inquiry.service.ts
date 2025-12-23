import Inquiry, { IInquiry } from "../models/Inquiry";
import { sendMail } from "../utils/mail";

// CREATE INQUIRY
export const createInquiry = async (data: Partial<IInquiry>) => {
    const { email, name, message, property } = data;
    const inquiry = await Inquiry.create({
        email,
        name,
        message,
        property,
    });
    await sendMail({
        to: process.env.ADMIN_EMAIL as string,
        subject: "New Property Inquiry",
        html: `<p>You have a new inquiry:</p><p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
    });
    return inquiry;
};

// GET ALL INQUIRIES (Admin)
export const getAllInquiries = async (limit: number, page: number) => {
  const skip = (page - 1) * limit;
  return Inquiry.find()
    .populate("property", "title slug price city municipality")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// GET SINGLE INQUIRY
export const getInquiryById = async (id: string) => {
  return Inquiry.findById(id).populate("property");
};

// UPDATE STATUS
export const updateInquiry = async (
  id: string,
  data: Partial<IInquiry>
) => {
  return Inquiry.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
export const deleteInquiry = async (id: string) => {
  return Inquiry.findByIdAndDelete(id);
};
