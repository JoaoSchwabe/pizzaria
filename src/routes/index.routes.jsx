import React, { Fragment } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
// eslint-disable-next-line
import useAuth from "../hooks/useAuth";
import Cardapio from "../pages/Cardapio";
import Endereco from "../pages/Endereco";
import Home from "../pages/Home";
import Pedido from "../pages/Pedido";
import Pedidos from "../pages/Privates/Pedidos";
import Profile from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const ProtectedRoutes = () => {
    const { signed } = useAuth();

    return signed ? <Outlet /> : <Navigate to="/login" />;
};

const RoutesAdmin = () => {
    const { user } = useAuth();

    return user?.type === "admin" ? <Outlet /> : <Navigate to="/" />;
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/pedido" element={<Pedido />} />
                        <Route exact path="/cardapio" element={<Cardapio />} />
                        <Route exact path="/endereco" element={<Endereco />} />
                        <Route exact path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<RoutesAdmin />}>
                        <Route exact path="/admin" element={<Pedidos />} />
                    </Route>
                    <Route exact path="/login" element={<Signin />} />
                    <Route exact path="/register" element={<Signup />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;
