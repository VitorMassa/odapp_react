import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context.context";
import ModalLoading from "../components/modal_loading.component"

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const [showAviso, setShowAviso] = useState(false);
  const msgAviso = "Usuário ou senha incorreta.";

  const [showErro, setShowErro] = useState(false);
  const msgErro = "Erro de sistema. Favor contatar o suporte.";

  const[loading, setLoading] = useState(false)

  const auth = useContext(AuthContext);

  if (!auth) {
    return <p>Erro: AuthContext não foi inicializado!</p>;
  }

  const handleLogin = async () => {
    setLoading(true)
    const handleLogin = await auth.login(login, senha);
    if (handleLogin == true) {
      setShowAviso(false);
      setShowErro(false);
      navigate("/home");
      setLoading(false)
    } else if (handleLogin == "401") {
      setShowAviso(true);
      setShowErro(false);
      setLoading(false)
    } else {
      setShowAviso(false);
      setShowErro(true);
      setLoading(false)
    }
  };

  return (
    <div className=" h-screen bg-white flex justify-center">
      <div className="div-login">
        <div className="w-full">
          <div className="w-full bg-blue-900 rounded-t flex justify-center">

          </div>
          <div className=" mx-24 mt-6">
            <label className="label-login">Usuário:</label>
            <input
              className="input-default"
              type="text"
              placeholder="Usuário"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="mx-24">
            <label className="label-login">Senha:</label>
            <input
              className="input-default"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className=" mx-24 mb-6">
            <button
              type="submit"
              className={
                login != "" && senha != "" ? "btn-on-login" : "btn-off-login"
              }
              disabled={login == "" || senha == ""}
              onClick={(e) => handleLogin()}
            >
              Entrar
            </button>
          </div>
          <div className="flex justify-center">
            {(showErro == true && (
              <div className=" div-alert bg-red-600">
                <p>{msgErro}</p>
              </div>
            )) ||
              (showAviso == true && (
                <div className="mt-10 p-3 h-1/6 bg-yellow-500 text-neutral-50 mx-10 border rounded text-center">
                  <p>{msgAviso}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ModalLoading open={loading} title=""/>
    </div>
  );
};

export default Login;
