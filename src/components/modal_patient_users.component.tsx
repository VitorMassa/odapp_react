import { useEffect, useState } from "react";
import type { patient } from "../interfaces/patient.interface";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { teamUser } from "../interfaces/teams_users.interface";
import type { user } from "../interfaces/user.interface";
import type { team } from "../interfaces/team.interface";
import { readTeamUsers, readNotTeamUsers } from "../services/team.service";
import {
  createTeamUser,
  deleteTeamUser,
} from "../services/teams_users.service";
import {
  readNotPatientUsers,
  readPatientUsers,
} from "../services/patient.service";
import {
  createPatientUser,
  deletePatientUser,
} from "../services/patients_users.service";
import type { patientsUsers } from "../interfaces/patients_users.interface";

interface ModalProps {
  open: boolean;
  patientData: patient | undefined;
  onClose?: () => void;
}

export const emptyPatient: patient = {
  uuid_patient: "",
  created_by_uuid_user: "",
  name: "",
  cpf: "",
  age: "",
  city: "",
  state: "",
};

export default function ModalPatientUsers({
  open,
  patientData,
  onClose,
}: ModalProps) {
  const [dataPatient, setDataPatient] = useState<patient>(
    patientData ?? emptyPatient,
  );
  const [patientUsers, setPatientUsers] = useState<patientsUsers[]>([]);
  const [notPatientUsers, setNotPatientUsers] = useState<user[]>([]);
  const [selectedUUIDNewUser, setSelectedUUIDNewUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const columns = ["Nome Familiar", "Ações"];

  useEffect(() => {
    if (patientData) {
      setDataPatient(patientData);
      fetchData();
    }
  }, [patientData]);

  async function fetchData() {
    if (patientData) {
      handleGetPatientUsers(patientData);
      handleGetNotPatientUsers(patientData);
    }
  }

  async function handleGetPatientUsers(patient: patient) {
    setLoading(true);
    await readPatientUsers(patient).then(
      (response) => {
        setPatientUsers(response.data.patient_users);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleGetNotPatientUsers(patient: patient) {
    setLoading(true);
    await readNotPatientUsers(patient).then(
      (response) => {
        setNotPatientUsers(response.data.patient_users);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleCreatePatientUser() {
    if (patientData) {
      setLoading(true);
      await createPatientUser(patientData, selectedUUIDNewUser).then(
        (response) => {
          fetchData();
          setLoading(false);
          setSelectedUUIDNewUser("");
        },
        (error) => {
          setLoading(false);
        },
      );
    }
  }

  async function handleDeletePatientUser(user: patientsUsers) {
    setLoading(true);
    await deletePatientUser(user).then(
      (response) => {
        fetchData();
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  return (
    <>
      <div
        className={`
          fixed inset-0 top-16 flex justify-center items-center transition-colors z-50
          ${open ? "visible bg-black/20" : "invisible"}
        `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white rounded-xl shadow transition-all isolate min-w-[50%]
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
        >
          <div className="bg-blue-600 p-4 text-white border-t rounded-t">
            <button
              onClick={onClose}
              className={`modal-btn-close ${onClose ? "" : "hidden"}`}
            >
              X
            </button>
            <h3 className="text-lg font-bold text-center">
              Adicionar Familiares
            </h3>
          </div>
          {(dataPatient.uuid_patient && (
            <>
              <div className="modal-content p-6 min-w-[100%] !overflow-auto border gap-4">
                <div className="flex w-full gap-2">
                  <div className="w-1/2">
                    <label className="modal-label">Nome do Paciente:</label>
                    <input
                      className="input-default"
                      type="text"
                      placeholder="Nome"
                      value={dataPatient.name ? dataPatient.name : ""}
                      onChange={(e) => {}}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="modal-label">CPF:</label>
                    <input
                      className="input-default"
                      type="text"
                      placeholder="Cpf"
                      value={dataPatient.cpf ? dataPatient.cpf : ""}
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full flex gap-4 mb-2">
                    <div className="mt-1">
                      <label className="modal-label !text-white">.</label>
                      <button
                        className={`bg-blue-600 p-2 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150 ${selectedUUIDNewUser != "" ? "" : "!bg-blue-950 !border-blue-950 hover:!bg-blue-950 hover:!border-blue-950"}`}
                        onClick={() => {
                          handleCreatePatientUser();
                        }}
                      >
                        <PlusIcon className=" size-5 mt-0.5" />
                        <span>Adicionar Familiar</span>
                      </button>
                    </div>
                    <div className="flex-1">
                      <label className="modal-label">Familiar:</label>
                      <select
                        className="col-span-1 select-form"
                        name=""
                        id="lista_restritiva"
                        value={selectedUUIDNewUser}
                        onChange={(e) => {
                          setSelectedUUIDNewUser(e.target.value);
                        }}
                        required
                      >
                        <option value="">
                          {selectedUUIDNewUser
                            ? notPatientUsers.find(
                                (b) => b.uuid_user === selectedUUIDNewUser,
                              )?.name || "SELECIONE"
                            : "SELECIONE"}
                        </option>
                        {notPatientUsers ? (
                          notPatientUsers.map((dados: user, index) => {
                            return (
                              <option key={index} value={dados.uuid_user}>
                                {dados.name}
                              </option>
                            );
                          })
                        ) : (
                          <option></option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="default-div-table">
                    <table className="default-table mb-5 border-collapse">
                      <thead className="sticky top-0 z-10">
                        <tr className="default-table-header">
                          {columns.map((coluna: string, key: number) => {
                            return (
                              <th
                                className="default-table-header-content"
                                key={key}
                              >
                                {" "}
                                {coluna}{" "}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      {patientUsers && (
                        <tbody className="h-4">
                          {patientUsers?.map((data: patientsUsers, index) => {
                            return (
                              <tr key={index} className="default-table-line">
                                <td className="default-table-content">
                                  {data.name ? data.name : "-"}
                                </td>
                                <td className="table-content-actions">
                                  <button
                                    className="table-btn-delete"
                                    onClick={() => {
                                      if (patientData) {
                                      }
                                      handleDeletePatientUser(data);
                                    }}
                                  >
                                    <TrashIcon className="size-5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6 p-6"></div>
            </>
          )) || (
            <div className="modal-content p-6 min-w-[100%] !overflow-auto flex border gap-4 !justify-center">
              <label className="modal-label !text-red-600">
                Erro, favor fechar e reabrir o modal
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
