interface ModalProps {
  open: boolean; 
  title?: string; 
}

const ModalLoading = (ModalProps: ModalProps) => {
  return (
    // LOADING quando a tela for maior que a de celular.
    <>
    <div
      className={`
          fixed inset-0 justify-center z-50 items-center transition-colors hidden sm:flex 
          ${ModalProps.open ? "visible bg-black/40" : "invisible"}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
            bg-white rounded-xl shadow p-6 transition-all isolate  max-h-80 max-w-80 
            ${ModalProps.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
      >
        <h3 className="text-lg font-black text-gray-800 border-b mb-4 pb-2 text-center">
          Carregando {ModalProps.title}
        </h3>
        <div className="flex relative">
          <div className="w-40 h-40 border-[25px] border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
    {/*LOADING quando tela pequena / celular */}
    <div
      className={`
          fixed inset-0 z-50 justify-center items-center transition-colors flex sm:hidden 
          ${ModalProps.open ? "visible bg-blue-900" : "invisible"}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
            bg-transparent rounded-xl shadow p-6 transition-all isolate  max-h-80 max-w-80 
            ${ModalProps.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
      >
        <h3 className="text-lg text-white border-b mb-4 pb-2 text-center">
          Carregando {ModalProps.title}
        </h3>
        <div className="flex relative">
          <div className="w-40 h-40 border-[25px] border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModalLoading;
