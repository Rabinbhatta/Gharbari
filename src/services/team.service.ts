// src/services/team.service.ts
import { Team, ITeam } from "../models/Team";

export const createTeamService = async (data: Partial<ITeam>) => {

  return Team.create(data);
};

export const getAllTeamService = async () => {
  return Team.find({ isActive: true }).sort({ createdAt: -1 });
};

export const getTeamByIdService = async (id: string) => {
  return Team.findById(id);
};

export const updateTeamService = async (
  id: string,
  data: Partial<ITeam>
) => {
  return Team.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeamService = async (id: string) => {
  return Team.findByIdAndDelete(id);
};
