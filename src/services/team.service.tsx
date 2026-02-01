import type { patient } from "../interfaces/patient.interface";
import type { team } from "../interfaces/team.interface";
import { https } from "../util/https.util";

const route = "/teams";

//Administrador
export const readAllTeams = async () => {
  try {
    const response = await https.get(`${route}/`);
    return response.data.teams;
  } catch (error) {
    throw error;
  }
};

export const readTeamUsers = async (team: team) => {
  console.log(team);
  try {
    const response = await https.get(`${route}/users`, {
      params: { uuid_team: team.uuid_team },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const readNotTeamUsers = async (team: team) => {
  console.log(team);
  try {
    const response = await https.get(`${route}/not-users`, {
      params: { uuid_team: team.uuid_team },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const createTeam = async (patient: patient) => {
  try {
    const response = await https.post(`${route}/`, {
      uuid_patient: patient.uuid_patient,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTeam = async (team: team) => {
  try {
    const response = await https.delete(`${route}/`, {
      data: {
        uuid_team: team.uuid_team
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
