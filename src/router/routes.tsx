import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/login.page";
import Home from "../pages/home.page";
import { AuthProvider } from "../context/auth-context.context";
import Menu from "../components/menu.component";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Menu />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}