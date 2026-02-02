import { useEffect, useState } from "react";
import type { patient } from "../interfaces/patient.interface";

interface ModalProps {
  open: boolean;
  patientData: patient | undefined;
  onClose?: () => void;
  onEdit: (patient: patient) => void;
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

export default function ModalEditPatient({
  open,
  patientData,
  onClose,
  onEdit,
}: ModalProps) {
  const [data, setData] = useState<patient>(patientData ?? emptyPatient);

  useEffect(() => {
    if (patientData) {
      setData(patientData);
    }
  }, [patientData]);

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
            <h3 className="text-lg font-bold text-center">Editar Paciente</h3>
          </div>
          {(data.uuid_patient && (
            <>
              <div className="modal-content p-6 min-w-[100%] !overflow-auto flex border gap-4">
                <div className="w-[50%]">
                  <label className="modal-label">Nome do Paciente:</label>
                  <input
                    className="input-default"
                    type="text"
                    placeholder="Nome"
                    value={data.name ? data.name : ""}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    required
                  />
                  <label className="modal-label">Cidade:</label>
                  <input
                    className="input-default"
                    type="text"
                    placeholder="Cidade"
                    value={data.city ? data.city : ""}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
                <div className="w-[50%]">
                  <label className="modal-label">CPF:</label>
                  <input
                    className="input-default"
                    type="text"
                    placeholder="Cpf"
                    value={data.cpf ? data.cpf : ""}
                    onChange={() => {}}
                    disabled
                  />
                  <div className="flex gap-4">
                    <div>
                      <label className="modal-label">Estado:</label>
                      <input
                        className="input-default"
                        type="text"
                        placeholder="Estado"
                        value={data.state ? data.state : ""}
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }));
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="modal-label">Idade:</label>
                      <input
                        className="input-default"
                        type="number"
                        placeholder="Idade"
                        value={data.age ? data.age : ""}
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }));
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 p-6">
                <button
                  className="bg-red-600 rounded text-white px-2 py-1 hover:bg-red-700 transition-colors delay-150 w-20"
                  onClick={() => {
                    setData(emptyPatient);
                    onClose?.();
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-600 rounded text-white px-2 py-1 hover:bg-green-700 transition-colors delay-150 w-20"
                  onClick={() => {
                    onEdit(data);
                    setData(emptyPatient);
                    onClose?.();
                  }}
                >
                  Editar
                </button>
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
    </>
  );
}
