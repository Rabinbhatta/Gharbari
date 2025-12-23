// src/controllers/faq.controller.ts
import { Request, Response } from "express";
import {
  createFaqService,
  getFaqsService,
  getFaqByIdService,
  updateFaqService,
  deleteFaqService,
} from "../services/faq.service";

// CREATE (Admin)
export const createFaq = async (req: Request, res: Response) => {
  const faq = await createFaqService(req.body);

  res.status(201).json({
    success: true,
    data: faq,
  });
};

// READ ALL (Public)
export const getFaqs = async (req: Request, res: Response) => {
  const onlyActive = req.query.all !== "true";

  const faqs = await getFaqsService(onlyActive);

  res.json({
    success: true,
    count: faqs.length,
    data: faqs,
  });
};

// READ BY ID (Admin)
export const getFaqById = async (req: Request, res: Response) => {
  const faq = await getFaqByIdService(req.params.id);

  if (!faq) {
    return res.status(404).json({ message: "FAQ not found" });
  }

  res.json({ success: true, data: faq });
};

// UPDATE (Admin)
export const updateFaq = async (req: Request, res: Response) => {
  const faq = await updateFaqService(req.params.id, req.body);

  if (!faq) {
    return res.status(404).json({ message: "FAQ not found" });
  }

  res.json({ success: true, data: faq });
};

// DELETE (Admin)
export const deleteFaq = async (req: Request, res: Response) => {
  const faq = await deleteFaqService(req.params.id);

  if (!faq) {
    return res.status(404).json({ message: "FAQ not found" });
  }

  res.json({
    success: true,
    message: "FAQ deleted successfully",
  });
};
