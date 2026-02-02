import { useEffect, useState } from "react";
import type { patient } from "../interfaces/patient.interface";
import ModalLoading from "./modal_loading.component";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { emptyPatient } from "./modal_patient_edit.component";
import type { login } from "../interfaces/login.interface";
import { readUserPatients } from "../services/user.service";
import ModalPatientInfos from "./modal_patient_infos.component";

interface ShowProps {
  user: login;
}

export default function ShowPatientsUser({ user }: ShowProps) {
  const [patientsData, setPatientsData] = useState<patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<patient>(emptyPatient);

  const [openPatientInfosModal, setOpenPatientInfosModal] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const columns = ["Nome", "CPF", "Idade", "Cidade", "Estado", "Ações"];

  useEffect(() => {
    handleGetPatients();
  }, []);

  async function handleGetPatients() {
    setLoading(true);
    await readUserPatients(user).then(
      (response) => {
        setPatientsData(response.data.user_patients);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  return (
    <div className="">
      <div className="flex justify-center">
        <span className="font-bold text-blue-600 uppercase">
          Tabela de Pacientes
        </span>
      </div>
      <div className="default-div-table">
        <table className="default-table mb-5 border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="default-table-header">
              {columns.map((coluna: string, key: number) => {
                return (
                  <th className="default-table-header-content" key={key}>
                    {" "}
                    {coluna}{" "}
                  </th>
                );
              })}
            </tr>
          </thead>
          {patientsData && (
            <tbody className="h-4">
              {patientsData?.map((data: patient, index) => {
                return (
                  <tr key={index} className="default-table-line">
                    <td className="default-table-content">
                      {data.name ? data.name : "-"}
                    </td>
                    <td className="default-table-content">
                      {data.cpf ? data.cpf : "-"}
                    </td>
                    <td className="default-table-content">
                      {data.age ? data.age : "-"}
                    </td>
                    <td className="default-table-content">
                      {data.city ? data.city : "-"}
                    </td>
                    <td className="default-table-content">
                      {data.state ? data.state : "-"}
                    </td>
                    <td className="table-content-actions">
                      <button
                        className="table-btn-read"
                        onClick={() => {
                          setSelectedPatient(data);
                          setOpenPatientInfosModal(true);
                        }}
                      >
                        <BookOpenIcon className=" size-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <ModalPatientInfos
        open={openPatientInfosModal}
        onClose={() => setOpenPatientInfosModal(false)}
        patientData={selectedPatient}
      />
      <ModalLoading open={loading} title="" />
    </div>
  );
}
