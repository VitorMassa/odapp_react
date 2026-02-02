import type { login } from "../interfaces/login.interface";
import { https } from "../util/https.util";

const route = "/users";

//Administrador
export const readAllUsers = async () => {
  try {
    const response = await https.get(`${route}/`);
    return response.data.patients;
  } catch (error) {
    throw error;
  }
};

//Medico
export const readUserTeams = async (user: login) => {
  try {
    const response = await https.get(`${route}/teams`, {
      params: { uuid_user: user.uuid_user },
    });

    return response;
  } catch (error) {
    throw error;
  }
};