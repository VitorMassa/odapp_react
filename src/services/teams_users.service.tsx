import type { team } from "../interfaces/team.interface";
import type { teamUser } from "../interfaces/teams_users.interface";
import type { user } from "../interfaces/user.interface";
import { https } from "../util/https.util";

const route = "/teams_users";

//Administrador
export const createTeamUser = async (team: team, user: string) => {
  try {
    const response = await https.post(`${route}/`, {
      uuid_team: team.uuid_team,
      uuid_user: user,
    });
    return response.data.team_user;
  } catch (error) {
    throw error;
  }
};

export const deleteTeamUser = async (user: teamUser) => {
  try {
    const response = await https.delete(`${route}/`, {
      data: {
        uuid_team_user: user.uuid_team_user
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
