import { useContext } from "react";
import { AuthContext } from "./auth-context.context";

//Utiliza-se esse context para busca de informações do usuário
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
