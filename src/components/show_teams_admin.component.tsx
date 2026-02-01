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
import { createTeam, deleteTeam, readAllTeams } from "../services/team.service";
import type { team } from "../interfaces/team.interface";
import ModalTeamUsers from "./modal_team_users.component";

interface ShowProps {
  user: login;
  onDeleteTeam: () => void;
  update_infos: Date
}

export default function ShowTeamsAdmin({ user, update_infos, onDeleteTeam }: ShowProps) {
  const [teamsData, setTeamsData] = useState<team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<team>();

  const [openTeamUsersModal, setOpenTeamUsersModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [confirmTitleModal, setConfirmTitleModal] = useState<string>("");
  const [confirmDescriptionModal, setConfirmDescriptionModal] =
    useState<string>("");
  const [tempConfirmHandler, setTempConfirmHandler] = useState<
    ((value: boolean) => void) | null
  >(null);

  const [loading, setLoading] = useState<boolean>(false);

  const columns = ["Nome Equipe", "Ações"];

  useEffect(() => {
    handleGetTeams();
  }, []);

  useEffect(() => {
    if (update_infos) {
      handleGetTeams();
    }
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

  function handleTeamUsersModal(team: team) {
    setSelectedTeam(team);
    setOpenTeamUsersModal(true);
  }

  async function handleGetTeams() {
    setLoading(true);
    await readAllTeams().then(
      (response) => {
        setTeamsData(response);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleDeleteTeam(team: team) {
    const confirm = await handleConfirmationModal(
      "Apagar Equipe",
      `Deseja Apagar o Equipe ${team.name}?`,
    );

    if (!confirm) {
      return;
    }
    setLoading(true);
    try {
      await deleteTeam(team);
      await handleGetTeams();
      await onDeleteTeam()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <div className="flex justify-center mb-3">
        <span className="font-bold text-blue-600 uppercase">
          Tabela de Equipes
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
          {teamsData && (
            <tbody className="h-4">
              {teamsData?.map((data: team, index) => {
                return (
                  <tr key={index} className="default-table-line">
                    <td className="default-table-content">
                      {data.name ? data.name : "-"}
                    </td>
                    <td className="table-content-actions">
                      <button
                        className={`table-btn-edit`}
                        onClick={() => {
                          handleTeamUsersModal(data);
                        }}
                      >
                        <span>Integrantes</span>
                      </button>
                      <button
                        className="table-btn-delete"
                        onClick={() => {
                          handleDeleteTeam(data);
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
      <ModalTeamUsers
        open={openTeamUsersModal}
        onClose={() => setOpenTeamUsersModal(false)}
        teamData={selectedTeam}
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
