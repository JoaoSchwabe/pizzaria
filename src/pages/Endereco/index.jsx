import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import { api } from "../../services/api";

const Endereco = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [error, setError] = useState("");
    const [alreadExists, setAlreadyExists] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
            setError("Preencha todos os campos");
            return;
        }
        const data = {
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        };
        console.log(data);
        api.post("/pizza/endereco", data).then((res) => {
            console.log(res.data);
        });

        if (!alreadExists) {
            navigate("/pedido");
        }
    };

    const handleCep = (e) => {
        setCep(e.target.value);
        if (e.target.value.length === 8) {
            api.get(`https://viacep.com.br/ws/${e.target.value}/json/`).then(
                (res) => {
                    console.log(res.data);
                    if (res.data.erro) {
                        setError("CEP não encontrado");
                        return;
                    }
                    res.data.logradouro && setRua(res.data.logradouro);
                    res.data.bairro && setBairro(res.data.bairro);
                    setCidade(res.data.localidade);
                    setEstado(res.data.uf);
                    setError("");
                }
            );
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
            setError("Preencha todos os campos");
            return;
        }
        const data = {
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        };
        console.log(data);
        api.put("/pizza/endereco", data).then((res) => {
            const { data } = res;
            setCep(data[0].cep);
            setRua(data[0].rua);
            setNumero(data[0].numero);
            setBairro(data[0].bairro);
            setCidade(data[0].cidade);
            setEstado(data[0].estado);
        });
        setMsg("Endereço atualizado com sucesso");
    };

    useEffect(() => {
        api.get("/pizza/endereco/get").then((res) => {
            const { data } = res;
            setCep(data.cep);
            setRua(data.rua);
            setNumero(data.numero);
            setBairro(data.bairro);
            setCidade(data.cidade);
            setEstado(data.estado);
            data.error ? setAlreadyExists(false) : setAlreadyExists(true);
        });
    }, []);

    useEffect(() => {
        if (alreadExists) {
            setMsg("Endereço já cadastrado");
        }
    }, [alreadExists]);

    useEffect(() => {
        if (msg) {
            setTimeout(() => {
                setMsg("");
            }, 5 * 1000);
        }
    }, [msg]);

    return (
        <>
            <Navbar />
            <h1 className="font-bold text-3xl mx-10 mt-5">Endereço</h1>
            {alreadExists ? (
                <p className="mx-8 md:mx-16">
                    Você já possui um endereço cadastrado, caso queira alterar
                    algum dado, basta alterar e clicar em "Salvar"
                </p>
            ) : (
                <p className="mx-8 md:mx-16">
                    Você ainda não possui um endereço cadastrado, basta
                    preencher os campos abaixo e clicar em "Salvar"
                </p>
            )}
            <div className={"grid grid-cols-1 md:grid-cols-2 mx-8 md:mx-20"}>
                <div>
                    <h2 className="font-bold">Defina seu endereço</h2>
                    <div className="w-[80vw] md:w-[30vw]">
                        <Input
                            label="CEP"
                            type="number"
                            placeholder="Digite seu CEP"
                            value={cep}
                            onChange={(e) => [
                                handleCep(e),
                                setCep(e.target.value),
                                setError(""),
                            ]}
                        />
                        <Input
                            label="Rua"
                            type="text"
                            placeholder="Digite sua Rua"
                            value={rua}
                            onChange={(e) => [
                                setRua(e.target.value),
                                setError(""),
                            ]}
                        />
                        <Input
                            label="Número"
                            type="number"
                            placeholder="Digite seu Número"
                            value={numero}
                            onChange={(e) => [
                                setNumero(e.target.value),
                                setError(""),
                            ]}
                        />
                        <Input
                            label="Bairro"
                            type="text"
                            placeholder="Digite seu Bairro"
                            value={bairro}
                            onChange={(e) => [
                                setBairro(e.target.value),
                                setError(""),
                            ]}
                        />
                        <Input
                            label="Cidade"
                            type="text"
                            placeholder="Digite sua Cidade"
                            value={cidade}
                            onChange={(e) => [
                                setCidade(e.target.value),
                                setError(""),
                            ]}
                        />
                        <Input
                            label="Estado"
                            type="text"
                            placeholder="Digite seu Estado"
                            value={estado}
                            onChange={(e) => [
                                setEstado(e.target.value),
                                setError(""),
                            ]}
                        />
                        <label className="text-red-600">{error}</label>
                        <label className="text-green-600">{msg}</label>
                    </div>
                    <button
                        className="bg-orange-400 hover:bg-orange-500 p-3 self-center rounded-md text-white font-bold"
                        onClick={(e) =>
                            alreadExists ? handleUpdate(e) : handleSubmit(e)
                        }
                    >
                        Salvar
                    </button>
                </div>
                <div>
                    <div className="w-[30vw]">
                        <div className="flex flex-col">
                            <h2 className="font-bold">Confira seu endereço</h2>
                            <label className="font-bold">CEP</label>
                            <label>{cep}</label>

                            <label className="font-bold">Cidade</label>
                            <label>{cidade}</label>

                            <label className="font-bold">Estado</label>
                            <label>{estado}</label>

                            <label className="font-bold">Bairro</label>
                            <label>{bairro}</label>

                            <label className="font-bold">Número</label>
                            <label>{numero}</label>

                            <label className="font-bold">Rua</label>
                            <label>{rua}</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Endereco;
