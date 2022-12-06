import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import Select from "react-select";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Pedido = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [selectedOpt, setSelectedOpt] = useState([]);
    const [selectedMassa, setSelectedMassa] = useState("");
    const [selectedBorda, setSelectedBorda] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = () => {
        console.log(selectedOpt);
        if (!selectedOpt || !selectedMassa || !selectedBorda) {
            setError("Preencha todos os campos");
            return;
        }
        const data = {
            sabores: selectedOpt.map((item) => item.value),
            massa: selectedMassa,
            borda: selectedBorda,
        };
        console.log(data);

        api.post("/pizza/pizza", data).then((res) => {
            console.log(res);
        });

        navigate("/profile");
    };

    const sabores = data.sabores?.map((sabor) => {
        return { value: sabor.idSabores, label: sabor.nome };
    });

    useEffect(() => {
        api.get("/pizza/opcoes")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    signout();
                    navigate("/login");
                }
            });

        api.get("/pizza/endereco/get").then((res) => {
            console.log(res.data);
            if (res.data.error) {
                navigate("/endereco");
            }
        });

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full min-h-[40vh] h-auto">
                    <div className="flex flex-col items-center justify-center md:justify-end">
                        <div className="min-w-[50vw] md:min-w-[25vw] text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 p-1 m-4">
                            <h1 className="text-base font-bold text-center pb-3">
                                Massa
                            </h1>
                            {data.massas?.map((item) => (
                                <div
                                    key={item.idMassas}
                                    className="p-4 w-full rounded-t-lg border-y border-gray-200"
                                >
                                    <input
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                                        type="radio"
                                        name="massa"
                                        id={"massa " + item.tipo}
                                        value={item.idMassas}
                                        onChange={(e) => {
                                            setSelectedMassa(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <label
                                        className="py-3 ml-2 w-full text-sm font-medium text-gray-900 "
                                        htmlFor={"massa " + item.tipo}
                                    >
                                        {item.tipo}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="min-w-[50vw] md:min-w-[25vw] text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 p-1 m-4">
                            <h1 className="text-base font-bold text-center pb-3">
                                Borda
                            </h1>
                            {data.bordas?.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 w-full rounded-t-lg border-y border-gray-200"
                                >
                                    <input
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                                        type="radio"
                                        name="borda"
                                        id={"borda" + index}
                                        value={item.idBordas}
                                        onChange={(e) => {
                                            setSelectedBorda(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <label
                                        className="py-3 ml-2 w-full text-sm font-medium text-gray-900 "
                                        htmlFor={"borda" + index}
                                    >
                                        {item.tipo}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex flex-1 flex-col items-center">
                            <label htmlFor="sabores">
                                Escolha o sabor (no máximo 3):{" "}
                            </label>
                            <Select
                                closeMenuOnSelect={false}
                                name="sabores"
                                className="w-auto min-w-[50vw] md:min-w-[25vw] pt-4"
                                isMulti
                                hideSelectedOptions={true}
                                options={sabores}
                                value={selectedOpt}
                                onChange={
                                    selectedOpt.length === 4
                                        ? setSelectedOpt(
                                              selectedOpt.slice(0, 3)
                                          )
                                        : (e) => setSelectedOpt(e)
                                }
                            />
                            <label className="text-red-600 py-2">{error}</label>
                            <button
                                type="submit"
                                className="bg-orange-500 text-lg hover:bg-orange-600 text-white rounded-md p-2 w-20 "
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Pedido;
