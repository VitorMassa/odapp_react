import { useEffect, useState } from "react";
import type { login } from "../interfaces/login.interface";
import type { team } from "../interfaces/team.interface";
import { readTeamNotes, readTeamUsers } from "../services/team.service";
import ModalLoading from "./modal_loading.component";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import type { teamUser } from "../interfaces/teams_users.interface";
import { createNote, deleteNote, updateNote } from "../services/note.service";
import type { note } from "../interfaces/note.interface";
import { readPatientReport } from "../services/patient.service";
import type { report } from "../interfaces/patient_report.interface";
import { updateReport } from "../services/patient_report.service";

interface ModalProps {
  open: boolean;
  teamData: team | undefined;
  user: login;
  onClose?: () => void;
}

export const emptyTeam: team = {
  uuid_team: "",
  uuid_patient: "",
  name: "",
};

export const emptyNote: note = {
  uuid_note: "",
  uuid_team: "",
  uuid_user: "",
  writer_name: "",
  content: "",
  created_at: "",
  updated_at: "",
};

export const emptyReport: report = {
  id: 0,
  uuid_report: "",
  uuid_patient: "",
  updated_by_uuid_user: "",
  content: "",
  created_at: "",
  updated_at: "",
};

export default function ModalTeamInfos({
  open,
  teamData,
  user,
  onClose,
}: ModalProps) {
  const [dataTeam, setDataTeam] = useState<team>(teamData ?? emptyTeam);
  const [teamUsers, setTeamUsers] = useState<teamUser[]>([]);
  const [teamNotes, setTeamNotes] = useState<note[]>([]);
  const [teamPatientReport, setTeamPatientReport] =
    useState<report>(emptyReport);
  const [addNote, setAddNote] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<boolean>(false);
  const [editReport, setEditReport] = useState<boolean>(false);
  const [newNoteContent, setNewNoteContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<note>(emptyNote);

  const [loading, setLoading] = useState<boolean>(false);

  const columns = ["Nome Participante", "Cargo"];
  const columnsNotes = [
    "Autor",
    "Data de Criação",
    "Data de Atualização",
    "Ação",
  ];

  useEffect(() => {
    if (teamData) {
      setDataTeam(teamData);
      handleGetTeamPatientReport(teamData);
      handleGetTeamNotes(teamData);
      handleGetTeamUsers(teamData);
    }
  }, [teamData]);

  function handleReadNote(note: note) {
    setSelectedNote(note);
    setAddNote(true);
  }

  function handleEditButtonNote(note: note) {
    setSelectedNote(note);
    setAddNote(true);
    setEditNote(true);
  }

  function handleBackToNotes() {
    setAddNote(false);
    setEditNote(false);
    setNewNoteContent("");
    setSelectedNote(emptyNote);
  }

  async function fetchData(team: team) {
    handleGetTeamNotes(team);
  }

  async function handleGetTeamPatientReport(team: team) {
    setLoading(true);
    await readPatientReport(team).then(
      (response) => {
        setTeamPatientReport(response);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleGetTeamNotes(team: team) {
    setLoading(true);
    await readTeamNotes(team).then(
      (response) => {
        console.log(response.data.team_notes);
        setTeamNotes(response.data.team_notes);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleGetTeamUsers(team: team) {
    setLoading(true);
    await readTeamUsers(team).then(
      (response) => {
        setTeamUsers(response.data.team_users);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      },
    );
  }

  async function handleCreateNote(content: string) {
    setLoading(true);
    if (teamData)
      await createNote(teamData, user, content).then(
        (response) => {
          fetchData(teamData);
          setLoading(false);
          setAddNote(false);
        },
        (error) => {
          setLoading(false);
        },
      );
  }

  async function handleUpdateNote(note: note) {
    setLoading(true);
    if (teamData)
      await updateNote(note).then(
        (response) => {
          fetchData(teamData);
          setSelectedNote(emptyNote);
          setLoading(false);
          setAddNote(false);
        },
        (error) => {
          setLoading(false);
        },
      );
  }

  async function handleDeleteNote(note: note) {
    setLoading(true);
    if (teamData)
      await deleteNote(note).then(
        (response) => {
          fetchData(teamData);
          setSelectedNote(emptyNote);
          setLoading(false);
          setAddNote(false);
        },
        (error) => {
          setLoading(false);
        },
      );
  }

  async function handleUpdateReport(report: report) {
    setLoading(true);
    if (teamData)
      await updateReport(report, user).then(
        (response) => {
          handleGetTeamPatientReport(teamData);
          setLoading(false);
          setEditReport(false);
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
            <h3 className="text-lg font-bold text-center">Infos da Equipe</h3>
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
                <div className="w-full flex gap-4">
                  <div className="w-[70%]">
                    <label className="modal-label">Lider da Equipe:</label>
                    <input
                      className="input-default"
                      type="text"
                      placeholder="Nome do Lider"
                      value={dataTeam.leader_name ? dataTeam.leader_name : ""}
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                  {user.uuid_user == teamData?.leader_uuid && (
                    <div className="mt-1 w-[30%]">
                      <label className="modal-label !text-white">.</label>
                      {/* <button
                        className={`bg-blue-600 p-2 mb-1 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150`}
                        onClick={() => {
                          !addNote
                            ? setEditReport(true)
                            : handleUpdateReport(teamPatientReport);
                        }}
                      >
                        <PencilIcon className=" size-5 mt-0.5" />
                        <span>Editar Laudo</span>
                      </button> */}
                      <button
                        className={`bg-blue-600 p-2 mb-1 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150 ${editReport ? "!bg-green-600 !border-green-600 hover:!bg-green-700 hover:!border-green-700" : ""}`}
                        onClick={() => {
                          !editReport
                            ? setEditReport(true)
                            : handleUpdateReport(teamPatientReport);
                        }}
                      >
                        <PencilIcon className=" size-5 mt-0.5" />
                        <span>{`${!editReport ? "Editar Laudo" : "Salvar Laudo"}`}</span>
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="modal-label">Laudo do Paciente:</label>
                  <textarea
                    className={`border ${!(user.uuid_user === teamData?.leader_uuid && editReport) ? "bg-slate-200" : "border-blue-600"}  rounded p-2 w-full h-32`}
                    maxLength={250}
                    placeholder="Descreva aqui..."
                    value={teamPatientReport?.content ?? ""}
                    onChange={(e) => {
                      setTeamPatientReport((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }));
                    }}
                    disabled={!(user.uuid_user === teamData?.leader_uuid && editReport)}
                  />
                  <span
                    className={`text-blue-600 font-bold ${!editReport ? "hidden" : "visible"}`}
                  >{`${teamPatientReport?.content?.length ?? 0}/250 caracteres`}</span>
                </div>
                <div className="w-full mt-3">
                  <div className="w-full flex gap-4 mb-2">
                    {addNote && (
                      <button
                        className={`bg-blue-600 p-2 mb-1 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150 `}
                        onClick={() => {
                          handleBackToNotes();
                        }}
                      >
                        <ArrowLeftIcon className=" size-5 mt-0.5" />
                        <span>Voltar</span>
                      </button>
                    )}
                    {selectedNote.uuid_note == "" && (
                      <button
                        className={`bg-blue-600 p-2 mb-1 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150 ${addNote && !selectedNote.uuid_note ? "!bg-green-600 !border-green-600 hover:!bg-green-700 hover:!border-green-700" : ""}`}
                        onClick={() => {
                          !addNote
                            ? setAddNote(true)
                            : handleCreateNote(newNoteContent);
                        }}
                      >
                        <PlusIcon className=" size-5 mt-0.5" />
                        <span>{`${!addNote ? "Adicionar Nota" : "Salvar Nota"}`}</span>
                      </button>
                    )}

                    {editNote && (
                      <button
                        className={`bg-blue-600 p-2 mb-1 border border-blue-600 rounded text-white font-bold flex gap-1 hover:bg-blue-700 hover:border-blue-700 transition-colors duration-150 ${editNote && selectedNote.uuid_note ? "!bg-yellow-500 !border-yellow-500 hover:!bg-yellow-600 hover:!border-yellow-600" : ""}`}
                        onClick={() => {
                          handleUpdateNote(selectedNote);
                        }}
                      >
                        <PencilIcon className=" size-5 mt-0.5" />
                        <span>Editar Nota</span>
                      </button>
                    )}
                    <span className="font-bold text-blue-600 uppercase mt-2">
                      {`${!addNote ? "Notas da Equipe:" : `Autor: ${user.name}`}`}
                    </span>
                  </div>
                  {(!addNote && (
                    <div className="default-div-table">
                      <table className="default-table mb-5 border-collapse">
                        <thead className="sticky top-0 z-10">
                          <tr className="default-table-header">
                            {columnsNotes.map((coluna: string, key: number) => {
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
                        {teamNotes && (
                          <tbody className="h-4">
                            {teamNotes?.map((data: note, index) => {
                              return (
                                <tr key={index} className="default-table-line">
                                  <td className="default-table-content">
                                    {data.writer_name ? data.writer_name : "-"}
                                  </td>
                                  <td className="default-table-content">
                                    {data.created_at
                                      ? new Date(
                                          data.created_at,
                                        ).toLocaleString("pt-BR", {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        })
                                      : "-"}
                                  </td>
                                  <td className="default-table-content">
                                    {data.updated_at == data.created_at
                                      ? "-"
                                      : new Date(
                                          data.updated_at,
                                        ).toLocaleString("pt-BR", {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        })}
                                  </td>
                                  <td className="table-content-actions">
                                    <button
                                      className="table-btn-read"
                                      onClick={() => {
                                        handleReadNote(data);
                                      }}
                                    >
                                      <BookOpenIcon className="size-5" />
                                    </button>
                                    <button
                                      className={`table-btn-edit ${user.uuid_user != data.uuid_user ? "!bg-blue-950 !border-blue-950 hover:!bg-blue-950 hover:!border-blue-950 cursor-default" : ""}`}
                                      onClick={() => {
                                        handleEditButtonNote(data);
                                      }}
                                      disabled={
                                        user.uuid_user != data.uuid_user
                                          ? true
                                          : false
                                      }
                                    >
                                      <PencilIcon className="size-5" />
                                    </button>
                                    <button
                                      className={`table-btn-delete ${user.uuid_user != data.uuid_user ? "!bg-red-950 !border-red-950 hover:!bg-red-950 hover:!border-red-950 cursor-default" : ""}`}
                                      onClick={() => {
                                        handleDeleteNote(data);
                                      }}
                                      disabled={
                                        user.uuid_user != data.uuid_user
                                          ? true
                                          : false
                                      }
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
                  )) ||
                    (addNote && !selectedNote.uuid_note && (
                      <div>
                        <textarea
                          className="border border-blue-600 rounded p-2 w-full h-32"
                          maxLength={250}
                          placeholder="Descreva aqui..."
                          value={newNoteContent ? newNoteContent : ""}
                          onChange={(e) => {
                            setNewNoteContent(e.target.value);
                          }}
                        />
                        <span
                          className={`text-blue-600 font-bold ${!newNoteContent ? "hidden" : "visible"}`}
                        >{`${newNoteContent?.length ?? 0}/250 caracteres`}</span>
                      </div>
                    )) || (
                      <div>
                        <textarea
                          className="border border-blue-600 rounded p-2 w-full h-32"
                          maxLength={250}
                          placeholder="Descreva aqui..."
                          value={selectedNote?.content ?? ""}
                          onChange={(e) => {
                            setSelectedNote((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }));
                          }}
                        />
                        <span
                          className={`text-blue-600 font-bold ${!newNoteContent ? "hidden" : "visible"}`}
                        >{`${selectedNote?.content?.length ?? 0}/250 caracteres`}</span>
                      </div>
                    )}
                </div>
                <div className="w-full mt-3">
                  <div className="w-full flex gap-4 mb-2">
                    <span className="font-bold text-blue-600 uppercase">
                      Membros da Equipe:
                    </span>
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
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                  </div>
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
