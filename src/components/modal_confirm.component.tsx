interface ModalProps {
  open: boolean; 
  setConfirm: (value: boolean) => void; 
  onClose: () => void;
  title?: string;
  description?: string;
}

const ModalConfirm = (ModalProps: ModalProps) => {
  function handleConfirm(confirm: boolean) {
    ModalProps.setConfirm(confirm)
    ModalProps.onClose();
  }

  return (
    // backdrop
    <div
      className={`
            fixed inset-0 top-16 flex justify-center items-center transition-colors z-50
            ${ModalProps.open ? "visible bg-black/20" : "invisible"}
          `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
              bg-white rounded-xl shadow transition-all isolate
              ${
                ModalProps.open
                  ? "scale-100 opacity-100"
                  : "scale-125 opacity-0"
              }
            `}
      >
        <h3 className="text-lg bg-blue-600 font-black text-white rounded-t mb-4 p-4 text-center">
          {ModalProps.title}
        </h3>
        <div className="modal-content !text-blue-600 !font-semibold p-6 !mb-8 text-center">
          <p>{ModalProps.description}</p>
        </div>
        <div className="flex justify-evenly p-6">
          <button
            className="bg-red-600 rounded text-white px-2 py-1 hover:bg-red-700 transition-colors delay-150"
            onClick={() => {
              handleConfirm(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 rounded text-white px-2 py-1 hover:bg-green-700 transition-colors delay-150"
            onClick={() => {
              handleConfirm(true);
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
