import type { login } from "../interfaces/login.interface";
import type { patient } from "../interfaces/patient.interface";
import { https } from "../util/https.util";

const route = "/patients";

//Administrador
export const readAllPatients = async () => {
  try {
    const response = await https.get(`${route}/`);
    return response.data.patients;
  } catch (error) {
    throw error;
  }
};

export const createPatient = async (patient: patient, user: login) => {
  try {
    const response = await https.post(`${route}/`, {
      name: patient.name,
      cpf: patient.cpf,
      city: patient.city,
      state: patient.state,
      age: patient.age,
      created_by_uuid_user: user.uuid_user,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePatient = async (patient: patient) => {
  try {
    const response = await https.put(`${route}/`, {
      uuid_patient: patient.uuid_patient,
      name: patient.name,
      cpf: patient.cpf,
      city: patient.city,
      state: patient.state,
      age: String(patient.age),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePatient = async (patient: patient) => {
  console.log(patient);
  try {
    const response = await https.delete(`${route}/`, {
      data: { uuid_patient: patient.uuid_patient },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
