import { useEffect, useState } from "react";
import type { patient } from "../interfaces/patient.interface";
import type { login } from "../interfaces/login.interface";
import type { data } from "react-router-dom";
import type { team } from "../interfaces/team.interface";
import { emptyUser } from "./modal_patient_create.component";
import {
  readAllTeams,
  readNotTeamUsers,
  readTeamUsers,
} from "../services/team.service";
import ModalLoading from "./modal_loading.component";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import type { user } from "../interfaces/user.interface";
import { createTeamUser, deleteTeamUser } from "../services/teams_users.service";
import type { teamUser } from "../interfaces/teams_users.interface";

interface ModalProps {
  open: boolean;
  teamData: team | undefined;
  onClose?: () => void;
}

export const emptyTeam: team = {
  uuid_team: "",
  uuid_patient: "",
  name: "",
};

export default function ModalTeamUsers({
  open,
  teamData,
  onClose,
}: ModalProps) {
  const [dataTeam, setDataTeam] = useState<team>(teamData ?? emptyTeam);
  const [teamUsers, setTeamUsers] = useState<teamUser[]>([]);
  const [notTeamUsers, setNotTeamUsers] = useState<user[]>([]);
  const [selectedUUIDNewUser, setSelectedUUIDNewUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const columns = ["Nome Participante", "Cargo", "Ações"];

  useEffect(() => {
    if (teamData) {
      setDataTeam(teamData);
      handleGetTeamUsers(teamData);
      handleGetNotTeamUsers(teamData);
    }
  }, [teamData]);

  async function fetchData(team: team) {
      handleGetTeamUsers(team);
      handleGetNotTeamUsers(team);
  }

  async function handleGetTeamUsers(data: team) {
    setLoading(true);
    await readTeamUsers(data).then(
      (response) => {
        setTeamUsers(response.data.team_users);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleGetNotTeamUsers(data: team) {
    setLoading(true);
    await readNotTeamUsers(data).then(
      (response) => {
        setNotTeamUsers(response.data.team_users);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleCreateTeamUser(team: team, user: string) {
    setLoading(true);
    await createTeamUser(team, user).then(
      (response) => {
        fetchData(team)
        setLoading(false);
        setSelectedUUIDNewUser("")
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleDeleteTeamUser(team: team, user: teamUser) {
    setLoading(true);
    await deleteTeamUser(user).then(
      (response) => {
        fetchData(team)
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
          fixed inset-0 top-16 flex justify-center items-center transition-colors
          ${open ? "visible bg-black/20" : "invisible"}
        `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white rounded-xl shadow transition-all isolate min-w-[50%] z-50
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
              Integrantes da Equipe
            </h3>
          </div>
          {(dataTeam?.uuid_team && (
            <>
              <div className="modal-content p-6 min-w-[100%] !overflow-auto border gap-4">
                <div className="w-full">
                  <label className="modal-label">Nome da Equipe:</label>
                  <input
                    className="input-default"
                    type="text"
                    placeholder="Nome da Equipe"
                    value={dataTeam.name ? dataTeam.name : ""}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <div className="w-full flex gap-4 mb-2">
                  <div className="mt-1">
                    <label className="modal-label !text-white">.</label>
                    <button
                      className={`bg-blue-600 p-2 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150 ${selectedUUIDNewUser != "" ? "" : "!bg-blue-950 !border-blue-950 hover:!bg-blue-950 hover:!border-blue-950" }`}
                      onClick={() => {
                        if (teamData && selectedUUIDNewUser)
                          handleCreateTeamUser(teamData, selectedUUIDNewUser)
                      }}
                    >
                      <PlusIcon className=" size-5 mt-0.5" />
                      <span>Adicionar Membro</span>
                    </button>
                  </div>
                  <div className="flex-1">
                    <label className="modal-label">Membro:</label>
                    <select
                      className="col-span-1 select-form"
                      name=""
                      id="lista_restritiva"
                      value={selectedUUIDNewUser}
                      onChange={(e) => {setSelectedUUIDNewUser(e.target.value)}}
                      required
                    >
                      <option value="">
                        {selectedUUIDNewUser
                          ? notTeamUsers.find((b) => b.uuid_user === selectedUUIDNewUser)
                              ?.name || "SELECIONE"
                          : "SELECIONE"}
                      </option>
                      {notTeamUsers ? (
                        notTeamUsers.map((dados: user, index) => {
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
                    {teamUsers && (
                      <tbody className="h-4">
                        {teamUsers?.map((data: teamUser, index) => {
                          return (
                            <tr key={index} className="default-table-line">
                              <td className="default-table-content">
                                {data.name ? data.name : "-"}
                              </td>
                              <td className="default-table-content">
                                {data.name_role ? data.name_role : "-"}
                              </td>
                              <td className="table-content-actions">
                                <button
                                  className="table-btn-delete"
                                  onClick={() => {
                                    if(teamData)
                                      handleDeleteTeamUser(teamData, data)
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
      <ModalLoading open={loading} title="" />
    </>
  );
}
