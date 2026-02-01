import { createContext, useState, useEffect, useRef } from "react";
import { https } from "../util/https.util";
import { useNavigate } from "react-router-dom";
import type { login } from "../interfaces/login.interface";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  user: login | null;
  login: (email: string, password: string) => Promise<boolean | string>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigator = useNavigate();

  //Busca informações de localStorage do Token e User
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<login | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  var userRef = useRef(user);

  //Função que verifica, a cada x tempo, se o token expirou.
  const checkTokenExpiration = () => {
    try {
      if (!userRef.current?.exp) return false;

      const expDate = userRef.current?.exp * 1000;
      const dataAtual = Date.now();

      return dataAtual > expDate;
    } catch (error) {
      return false;
    }
  };

  //Garante a inicialização do Axios
  useEffect(() => {
    https;
  }, []);

  //Em caso de alteração no valor do Token, faça procedimentos de verificação e inserção na localStorage
  useEffect(() => {
    if (token) {
      https.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(token)
      localStorage.setItem("token", token);
      try {
        const decodedUser: login = jwtDecode(token);
        setUser(decodedUser);
        localStorage.setItem("user", JSON.stringify(decodedUser));
      } catch (error) {
        setUser(null);
        localStorage.removeItem("user");
      }

      const interval = setInterval(() => {
        if (checkTokenExpiration()) {
          logout();
        }
      }, 60000);

      return () => clearInterval(interval);
    } else {
      delete https.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigator("/");
    }
  }, [token]);

  //Garante a busca das informações de usuário
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  //Função Async responsável pelo login e salvamento do token em um estado
  const login = async (
    email: string,
    password: string
  ): Promise<boolean | string> => {
    return await https
      .post("auth", { email: email, password: password })
      .then(
        (response) => {
          console.log(response)
          setToken(response.data.token);
          return true;
        },
        (error) => {
          console.log(error)
          return error.status;
        }
      );
  };

  //Função de logout
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

