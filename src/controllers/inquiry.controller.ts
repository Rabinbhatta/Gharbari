import { Request, Response, NextFunction } from "express";
import * as inquiryService from "../services/inquiry.service";

export const createInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inquiry = await inquiryService.createInquiry(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

export const getAllInquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const inquiries = await inquiryService.getAllInquiries(limit, page);
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};

export const getInquiryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inquiry = await inquiryService.getInquiryById(req.params.id);
    res.json(inquiry);
  } catch (error) {
    next(error);
  }
};

export const updateInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inquiry = await inquiryService.updateInquiry(
      req.params.id,
      req.body
    );
    res.json(inquiry);
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await inquiryService.deleteInquiry(req.params.id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};
