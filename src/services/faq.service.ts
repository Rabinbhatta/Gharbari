// src/services/faq.service.ts
import { Faq, IFaq } from "../models/FAQ";

export const createFaqService = async (data: Partial<IFaq>) => {
  return Faq.create(data);
};

export const getFaqsService = async (onlyActive = true) => {
  const filter = onlyActive ? { isActive: true } : {};
  return Faq.find(filter).sort({ createdAt: -1 });
};

export const getFaqByIdService = async (id: string) => {
  return Faq.findById(id);
};

export const updateFaqService = async (
  id: string,
  data: Partial<IFaq>
) => {
  return Faq.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFaqService = async (id: string) => {
  return Faq.findByIdAndDelete(id);
};
