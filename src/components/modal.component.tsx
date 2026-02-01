interface ModalProps {
  open: boolean; // Tipar corretamente `open`
  onClose?: () => void;
  title?: string; // Tipar corretamente `onClose` como uma função sem argumentos
  closeTitle?: string;
  children?: React.ReactNode; // `children` para o conteúdo do modal
  footer?: React.ReactNode;
  alert?: React.ReactNode;
}

const Modal = (ModalProps: ModalProps) => {
  return (
    // backdrop
    <div
      className={`
          fixed inset-0 top-16 flex justify-center items-center transition-colors
          ${ModalProps.open ? "visible bg-black/20" : "invisible"}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
            bg-white rounded-xl shadow p-6 transition-all isolate min-w-[50%]
            ${ModalProps.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
      >
        <button onClick={ModalProps.onClose} className={`modal-btn-close ${ModalProps.onClose ? "" : "hidden"}`}>
          {ModalProps.closeTitle ? ModalProps.closeTitle : "X"}
        </button>
        <h3 className="text-lg font-black text-gray-800 border-b mb-4 pb-2 text-center">
          {ModalProps.title}
        </h3>
        <div className="modal-content min-w-[100%] !overflow-auto">
          {ModalProps.children}
        </div>
        {ModalProps.footer}
        <div>{ModalProps.alert}</div>
      </div>
    </div>
  );
};

export default Modal;
