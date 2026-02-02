import { useEffect, useState } from "react";
import type { patient } from "../interfaces/patient.interface";
import type { userPatient } from "../interfaces/user.interface";

interface ModalProps {
  open: boolean;
  patientData: userPatient | undefined;
  onClose?: () => void;
}

export const emptyUserPatient: userPatient = {
  name: "",
  cpf: "",
  age: "",
  city: "",
  state: "",
  content:""
};

export default function ModalPatientInfos({
  open,
  patientData,
  onClose,
}: ModalProps) {
  const [dataPatient, setDataPatient] = useState<userPatient>(
    patientData ?? emptyUserPatient,
  );

  useEffect(() => {
    if (patientData) {
      setDataPatient(patientData);
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
            <h3 className="text-lg font-bold text-center">Informações do Paciente</h3>
          </div>
          {(dataPatient.cpf && (
            <>
              <div className="modal-content p-6 min-w-[100%] !overflow-auto border gap-4">
                <div className="w-full flex gap-4">
                  <div className="w-[50%]">
                    <label className="modal-label">Nome do Paciente:</label>
                    <input
                      className="input-default"
                      type="text"
                      placeholder="Nome"
                      value={dataPatient.name ? dataPatient.name : ""}
                      onChange={(e) => {}}
                      disabled
                    />
                    <label className="modal-label">Cidade:</label>
                    <input
                      className="input-default"
                      type="text"
                      placeholder="Cidade"
                      value={dataPatient.city ? dataPatient.city : ""}
                      onChange={(e) => {}}
                      disabled
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="modal-label">CPF:</label>
                    <input
                      className="input-default"
                      type="text"
                      placeholder="Cpf"
                      value={dataPatient.cpf ? dataPatient.cpf : ""}
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
                          value={dataPatient.state ? dataPatient.state : ""}
                          onChange={() => {}}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="modal-label">Idade:</label>
                        <input
                          className="input-default"
                          type="number"
                          placeholder="Idade"
                          value={dataPatient.age ? dataPatient.age : ""}
                          onChange={() => {}}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label className="modal-label">Laudo do Paciente:</label>
                  <textarea
                    className={`border bg-slate-200 rounded p-2 w-full h-32`}
                    maxLength={250}
                    placeholder="Descreva aqui..."
                    value={dataPatient?.content ?? ""}
                    onChange={() => {}}
                    disabled
                  />
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
    </>
  );
}
