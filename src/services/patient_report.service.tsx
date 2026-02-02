import { https } from "../util/https.util";
import type { report } from "../interfaces/patient_report.interface";
import type { login } from "../interfaces/login.interface";

const route = "/patients_report";

export const updateReport = async (report: report, user: login) => {
  try {
    const response = await https.put(`${route}/`, {
      uuid_report: report.uuid_report,
      updated_by_uuid_user: user.uuid_user,
      content: report.content,
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};