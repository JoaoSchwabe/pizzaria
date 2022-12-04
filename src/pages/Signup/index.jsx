import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { api } from "../../services/api";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    const { signed, signin } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email | !emailConf | !senha) {
            setError("Preencha todos os campos");
            return;
        } else if (email !== emailConf) {
            setError("Os e-mails não são iguais");
            return;
        }

        const res = await api.post("/register", {
            email,
            password: senha,
            name,
        });

        if (res.status === 200) {
            const data = { email, password: senha };
            signin(data);
        } else {
            setError("Erro ao cadastrar");
        }
    };

    if (signed) {
        return <Navigate to="/" />;
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
                            Crie uma conta na nossa pizzaria!
                        </p>
                        <div className="sm:flex sm:items-center">
                            <form
                                className="w-full mt-8"
                                onSubmit={handleSignup}
                            >
                                <Input
                                    type="text"
                                    placeholder="Digite seu Nome"
                                    value={name}
                                    onChange={(e) => [
                                        setName(e.target.value),
                                        setError(""),
                                    ]}
                                />
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
                                    type="email"
                                    placeholder="Confirme email"
                                    value={emailConf}
                                    onChange={(e) => [
                                        setEmailConf(e.target.value),
                                        setError(""),
                                    ]}
                                />
                                <Input
                                    type="password"
                                    placeholder="Digite sua Senha"
                                    value={senha}
                                    onChange={(e) => [
                                        setSenha(e.target.value),
                                        setError(""),
                                    ]}
                                />
                                <label className="text-red-600">{error}</label>
                                <Button Text="Cadastrar" Type="submit" />
                                <label className="flex justify-between text-gray-400 py-2">
                                    Já tem uma conta?
                                    <strong>
                                        <Link to="/login">&nbsp;Entre</Link>
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

export default Signup;
