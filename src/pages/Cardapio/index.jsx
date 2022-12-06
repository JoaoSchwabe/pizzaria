import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { api } from "../../services/api";

const Cardapio = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const { massas, bordas, sabores } = data;

    useEffect(() => {
        api.get("/pizza/opcoes")
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    navigate("/login");
                }
            });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-1 flex-col h-full w-full">
                <div>
                    <h1 className="text-3xl font-bold m-5"> Cardápio</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 h-full m-10 items-start">
                    <div className="flex flex-1 flex-col bg-white shadow-md rounded-xl m-5 md:mx-5 md:m-0 py-4 items-center">
                        <label className="text-center font-bold text-lg">
                            Massas
                        </label>
                        {massas?.map((item, index) => (
                            <p key={index}>{item.tipo}</p>
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col bg-white shadow-md rounded-xl m-5 md:mx-5 md:m-0 py-4 items-center">
                        <label className="text-center font-bold text-lg">
                            Bordas
                        </label>
                        {bordas?.map((item, index) => (
                            <p key={index}>{item.tipo}</p>
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col bg-white shadow-md rounded-xl m-5 md:mx-5 md:m-0 py-4 items-center">
                        <label className="text-center font-bold text-lg">
                            Sabores
                        </label>
                        {sabores?.map((item) => (
                            <p key={item.idSabores}>{item.nome}</p>
                        ))}
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <button
                        onClick={() => navigate("/pedido")}
                        className="border-orange-500 p-5 bg-orange-400 hover:bg-orange-500 hover:p-6 rounded-md text-white font-bold"
                    >
                        Faça seu pedido
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cardapio;
