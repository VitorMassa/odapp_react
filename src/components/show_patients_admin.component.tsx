import { useEffect, useState } from "react";
import type { patient } from "../interfaces/patient.interface";
import {
  createPatient,
  deletePatient,
  readAllPatients,
  updatePatient,
} from "../services/patient.service";
import ModalLoading from "./modal_loading.component";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import ModalConfirm from "./modal_confirm.component";
import ModalEditPatient from "./modal_patient_edit.component";
import ModalCreatePatient from "./modal_patient_create.component";
import type { login } from "../interfaces/login.interface";
import { createTeam } from "../services/team.service";

interface ShowProps {
  user: login;
  onNewTeam: () => void;
  update_infos: Date;
}

export default function ShowPatientsAdmin({
  user,
  update_infos,
  onNewTeam, 
}: ShowProps) {
  const [patientsData, setPatientsData] = useState<patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<patient>();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [confirmTitleModal, setConfirmTitleModal] = useState<string>("");
  const [confirmDescriptionModal, setConfirmDescriptionModal] =
    useState<string>("");
  const [tempConfirmHandler, setTempConfirmHandler] = useState<
    ((value: boolean) => void) | null
  >(null);

  const [loading, setLoading] = useState<boolean>(false);

  const columns = ["Nome", "CPF", "Idade", "Cidade", "Estado", "Ações"];

  useEffect(() => {
    handleGetPatients();
  }, []);

  useEffect(() => {
      handleGetPatients();
  }, [update_infos]);

  function handleConfirmationModal(
    title: string,
    description: string,
  ): Promise<boolean> {
    setConfirmTitleModal(title);
    setConfirmDescriptionModal(description);
    setOpenConfirmModal(true);

    return new Promise((resolve) => {
      const listener = (value: boolean) => {
        resolve(value);
        setOpenConfirmModal(false);
      };
      setTempConfirmHandler(() => listener);
    });
  }

  function handleEditModal(patient: patient) {
    setSelectedPatient(patient);
    setOpenEditModal(true);
  }

  async function handleGetPatients() {
    setLoading(true);
    await readAllPatients().then(
      (response) => {
        setPatientsData(response);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleCreatePatient(patient: patient, user: login) {
    const confirm = await handleConfirmationModal(
      "Criar Paciente",
      `Deseja Criar o Paciente ${patient.name}?`,
    );

    if (!confirm) {
      return;
    }
    setLoading(true);
    try {
      await createPatient(patient, user);
      await handleGetPatients();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleEditPatient(patient: patient) {
    const confirm = await handleConfirmationModal(
      "Editar Paciente",
      `Deseja Editar o Paciente ${patient.name}?`,
    );

    if (!confirm) {
      return;
    }
    setLoading(true);
    try {
      await updatePatient(patient);
      await handleGetPatients();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePatient(patient: patient) {
    const confirm = await handleConfirmationModal(
      "Apagar Paciente",
      `Deseja Apagar o Paciente ${patient.name}?`,
    );

    if (!confirm) {
      return;
    }
    setLoading(true);
    try {
      await deletePatient(patient);
      await handleGetPatients();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTeam(patient: patient) {
    const confirm = await handleConfirmationModal(
      "Criar Time",
      `Deseja Criar o Time: '${patient.name} - (${patient.cpf})'?`,
    );

    if (!confirm) {
      return;
    }
    setLoading(true);
    try {
      await createTeam(patient);
      await handleGetPatients();
      await onNewTeam();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-600 p-2 mb-1 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          <PlusIcon className=" size-5 mt-0.5" />
          <span>Adicionar Paciente</span>
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 font-bold text-blue-600 uppercase">
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
                        className={`table-btn-edit !gap-1 ${data.uuid_team ? "!bg-blue-950 hover:!bg-blue-950 cursor-default" : ""}`}
                        onClick={() => {
                          handleCreateTeam(data);
                        }}
                        disabled={data.uuid_team ? true : false}
                      >
                        <PlusIcon className=" size-5" />
                        <span className="md:hidden">Time</span>
                        <span className="hidden md:block">Equipe</span>
                      </button>
                      <button
                        className="table-btn-edit"
                        onClick={() => {
                          handleEditModal(data);
                        }}
                      >
                        <PencilIcon className=" size-5" />
                      </button>
                      <button
                        className="table-btn-delete"
                        onClick={() => {
                          handleDeletePatient(data);
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
      <ModalEditPatient
        open={openEditModal}
        patientData={selectedPatient}
        onClose={() => setOpenEditModal(false)}
        onEdit={handleEditPatient}
      />
      <ModalCreatePatient
        open={openCreateModal}
        userData={user}
        onClose={() => setOpenCreateModal(false)}
        onSave={handleCreatePatient}
      />
      <ModalConfirm
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        title={confirmTitleModal}
        description={confirmDescriptionModal}
        setConfirm={(value) => {
          if (tempConfirmHandler) tempConfirmHandler(value);
        }}
      />
      <ModalLoading open={loading} title="" />
    </div>
  );
}
