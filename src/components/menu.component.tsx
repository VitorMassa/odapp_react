import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context.context";
import { useAuth } from "../context/use-auth.context";

export default function Menu() {
    const auth = useContext(AuthContext);
    const { pathname } = useLocation();
    const { user } = useAuth();

    function logOut() {
        auth?.logout();
    }

    return (
        <>
            {pathname != "/" && (
                <div className="bg-blue-500 w-full p-3 flex justify-between">
                    <div>
                        <label className="text-white text-2xl font-bold">
                            CAREAPP
                        </label>
                    </div>
                    <ul className="flex justify-around gap-6">
                        <label className="py-1 text-white font-bold md:hidden">
                            {`${user?.name} ${user?.role.name != "stake_holder" ? `(Cargo: ${user?.role.name})` : ""}`}
                        </label>
                        <label className="py-1 text-white font-bold hidden md:block">
                            {`Seja Bem-Vindo, ${user?.name} ${user?.role.name != "stake_holder" ? `(Cargo: ${user?.role.name})` : ""}`}
                        </label>
                        <li
                            className="py-1 px-4 border bg-red-500 border-red-500 rounded text-white cursor-pointer hover:border-red-700 hover:bg-red-700 transition-colors duration-150"
                            onClick={() => logOut()}
                        >
                            Sair
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}