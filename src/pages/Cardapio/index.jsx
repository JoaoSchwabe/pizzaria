import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Cardapio = () => {
    const navigate = useNavigate();
    const massa = ["comum", "integral", "temperada"];
    const borda = ["cheddar", "catupiry", "chocolate"];
    const sabores = [
        { value: 1, label: "4 Queijos" },
        { value: 2, label: "Frango com Catupiry" },
        { value: 3, label: "Calabresa" },
        { value: 4, label: "Lombinho" },
        { value: 5, label: "Filé com Cheddar" },
        { value: 6, label: "Portuguesa" },
        { value: 7, label: "Margherita" },
    ];
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
                        {massa.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col bg-white shadow-md rounded-xl m-5 md:mx-5 md:m-0 py-4 items-center">
                        <label className="text-center font-bold text-lg">
                            Bordas
                        </label>
                        {borda.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col bg-white shadow-md rounded-xl m-5 md:mx-5 md:m-0 py-4 items-center">
                        <label className="text-center font-bold text-lg">
                            Sabores
                        </label>
                        {sabores.map((item, index) => (
                            <p key={item.value}>{item.label}</p>
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
