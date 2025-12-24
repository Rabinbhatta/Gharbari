// src/controllers/team.controller.ts
import { Request, Response } from "express";
import {
  createTeamService,
  getAllTeamService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
} from "../services/team.service";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary";

// CREATE TEAM (ADMIN)
export const createTeam = async (req: Request, res: Response) => {
  let imageUrl = req.body.image;

  if (req.file?.path) {
    imageUrl = await uploadToCloudinary(req.file.path);
  }

  const team = await createTeamService({
    ...req.body,
    image: imageUrl,
  });

  res.status(201).json({
    success: true,
    message: "Team member added",
    data: team,
  });
};

// GET ALL TEAM (PUBLIC)
export const getTeam = async (_req: Request, res: Response) => {
  const team = await getAllTeamService();

  res.json({
    success: true,
    count: team.length,
    data: team,
  });
};

// GET TEAM BY ID (PUBLIC)
export const getTeamById = async (req: Request, res: Response) => {
  const team = await getTeamByIdService(req.params.id);

  if (!team) {
    return res.status(404).json({ message: "Team member not found" });
  }

  res.json({
    success: true,
    data: team,
  });
};

// UPDATE TEAM (ADMIN)
export const updateTeam = async (req: Request, res: Response) => {
  const existing = await getTeamByIdService(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Team member not found" });
  }

  if (req.file?.path) {
    await deleteFromCloudinary(existing.image);
    req.body.image = await uploadToCloudinary(req.file.path);
  }

  const updated = await updateTeamService(req.params.id, req.body);

  res.json({
    success: true,
    message: "Team member updated",
    data: updated,
  });
};

// DELETE TEAM (ADMIN)
export const deleteTeam = async (req: Request, res: Response) => {
  const team = await getTeamByIdService(req.params.id);

  if (!team) {
    return res.status(404).json({ message: "Team member not found" });
  }

  await deleteFromCloudinary(team.image);
  await deleteTeamService(req.params.id);

  res.json({
    success: true,
    message: "Team member deleted",
  });
};
