import type { patient } from "../interfaces/patient.interface";
import type { patientsUsers } from "../interfaces/patients_users.interface";
import type { teamUser } from "../interfaces/teams_users.interface";
import type { user } from "../interfaces/user.interface";
import { https } from "../util/https.util";

const route = "/patients_users";

//Administrador
export const createPatientUser = async (patient: patient, user: string) => {
  try {
    const response = await https.post(`${route}/`, {
      uuid_patient: patient.uuid_patient,
      uuid_user: user,
    });
    return response.data.team_user;
  } catch (error) {
    throw error;
  }
};

export const deletePatientUser = async (user: patientsUsers) => {
  try {
    const response = await https.delete(`${route}/`, {
      data: {
        uuid_patient_user: user.uuid_patient_user
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
