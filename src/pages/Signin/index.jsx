import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
    const { signed, signin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email | !password) {
            setError("Preencha todos os campos");
            return;
        }
        const data = { email, password };

        await signin(data);
    };

    if (signed) {
        return <Navigate to={"/"} />;
    } else {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="lg:min-h-screen lg:flex lg:items-center p-8 sm:p-12 bg-amber-500">
                    <div className="flex-grow">
                        <h1 className="text-white text-center text-2xl sm:text-5xl mb-2 ">
                            PIZZARIA
                        </h1>
                        <h1 className="text-white text-center text-2xl sm:text-5xl mb-2 ">
                            DO JOÃO
                        </h1>
                    </div>
                </div>
                <div className="lg:min-h-screen lg:flex lg:items-center p-12 lg:p-24 xl:p-48 bg-orange-100">
                    <div className="flex-grow bg-white shadow-xl rounded-md border justify-center border-gray-300 p-8">
                        <p className="text-center text-lg font-bold text-gray-6 00">
                            Faça login para continuar
                        </p>
                        <div className="sm:flex sm:items-center">
                            <form className="w-full mt-8">
                                <Input
                                    type="email"
                                    placeholder="Digite seu E-mail"
                                    value={email}
                                    onChange={(e) => [
                                        setEmail(e.target.value),
                                        setError(""),
                                    ]}
                                />
                                <Input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => [
                                        setPassword(e.target.value),
                                        setError(""),
                                    ]}
                                />
                                <label className="text-red-600">{error}</label>
                                <Button
                                    Text="Entrar"
                                    Type="button"
                                    onClick={handleLogin}
                                />
                                <label className="flex justify-between text-gray-400 py-2">
                                    Não tem uma conta?
                                    <strong>
                                        <Link to="/register">
                                            &nbsp;Registre-se
                                        </Link>
                                    </strong>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Signin;
