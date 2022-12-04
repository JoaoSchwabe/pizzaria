import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const admin = user?.type === "admin";

    return (
        <nav className="w-full p-5 bg-white shadow md:flex md:items-center md:justify-between border-b-2 border-neutral-300">
            <div className="flex justify-between items-center">
                <Link
                    to={"/"}
                    className="text-2xl font-bold text-neutral-700 cursor-pointer"
                >
                    PIZZARIA DO JOÃO
                </Link>
                <button
                    onClick={() => setOpen(!open)}
                    className="text-3xl cursor-pointer md:hidden block"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500`}
            >
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/pedido">
                    Pedido
                </NavLink>
                <NavLink className="nav-link" to="/cardapio">
                    Cardápio
                </NavLink>
                <NavLink className="nav-link" to="/endereco">
                    Endereço
                </NavLink>
                {admin ? (
                    <NavLink className="nav-link" to="/admin">
                        Admin
                    </NavLink>
                ) : null}
            </div>
            {/* Nav Links mobile  */}

            <div className="md:hidden justify-center">
                <div
                    className={`md:hidden bg-white fixed top-0 w-48 py-12 pl-4 duration-500 flex-col flex items-center justify-center
                    ${open ? "left-0" : "left-[-100%]"}`}
                >
                    <NavLink className="nav-link" to="/">
                        Home
                    </NavLink>
                    <NavLink className="nav-link" to="/pedido">
                        Pedido
                    </NavLink>
                    <NavLink className="nav-link" to="/cardapio">
                        Cardápio
                    </NavLink>
                    <NavLink className="nav-link" to="/endereco">
                        Endereço
                    </NavLink>

                    {admin && (
                        <NavLink className="nav-link" to="/admin">
                            Admin
                        </NavLink>
                    )}

                    <NavLink
                        to={"/profile"}
                        className="mt-3 justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                        Perfil
                    </NavLink>
                </div>
            </div>
            <NavLink
                to={"/profile"}
                className="hidden md:flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
                Perfil
            </NavLink>
        </nav>
    );
};

export default Navbar;
