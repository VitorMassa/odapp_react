import type { login } from "../interfaces/login.interface";
import type { note } from "../interfaces/note.interface";
import type { team } from "../interfaces/team.interface";
import { https } from "../util/https.util";

const route = "/notes";

//Medico
export const createNote = async (team: team, user: login, content: string) => {
  try {
    const response = await https.post(`${route}/`, {
      uuid_team: team.uuid_team,
      uuid_user: user.uuid_user,
      content: content
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (note: note) => {
  try {
    const response = await https.put(`${route}/`, {
      uuid_note: note.uuid_note,
      content: note.content
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (note: note) => {
  try {
    const response = await https.delete(`${route}/`, {
      data: { uuid_note: note.uuid_note },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};