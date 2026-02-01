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