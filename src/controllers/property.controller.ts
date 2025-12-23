import { Request, Response, NextFunction } from "express";
import * as propertyService from "../services/property.service";

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const property = await propertyService.createProperty(
      req.body,
      req.files
    );
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await propertyService.getProperties(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    res.json(property);
  } catch (err) {
    next(err);
  }
};

export const getPropertyBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await propertyService.getPropertyBySlug(req.params.slug);
    res.json(property);
  } catch (err) {
    next(err);
  }
};

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const property = await propertyService.updateProperty(
      req.params.id,
      req.body,
      req.files
    );
    res.json(property);
  } catch (err) {
    next(err);
  }
};


export const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await propertyService.deleteProperty(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const verifyProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await propertyService.verifyProperty(req.params.id);
    res.json(property);
  } catch (err) {
    next(err);
  }
};

export const updatePropertyStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await propertyService.updatePropertyStatus(
      req.params.id,
      req.body.status
    );
    res.json(property);
  } catch (err) {
    next(err);
  }
};
