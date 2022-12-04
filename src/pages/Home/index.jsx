import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Chart } from "react-google-charts";

import pizza from "../../assets/pizza.jpg";
import { useEffect } from "react";
import { api } from "../../services/api";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("@Auth:token")) {
            navigate("/login");
        }

        api.get("/pizza/grafico").then((response) => {
            setData([
                ["Sabor", "Total"],
                ...response.data.map((item) => [item.nome, item.quant]),
            ]);
        });

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar />

            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
                <div className="h-screen flex flex-1 flex-col items-center justify-center bg-white p-12 md:py-24">
                    <h1 className="text-4xl font-bold">Bem vindo!</h1>
                    <p className="text-xl text-center">
                        Faça seu pedido que entregamos para você!!!
                    </p>

                    <button
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() => navigate("/pedido")}
                    >
                        Fazer pedido
                    </button>

                    <Chart
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={data}
                        options={{
                            title: "Sabores mais vendidos",
                        }}
                    />
                </div>
                <div className="hidden md:flex h-screen flex-1 flex-col items-center justify-center bg-orange-500">
                    <img
                        src={pizza}
                        alt="pegando pizza aiii papai q fome"
                        className="hidden md:flex object-cover h-screen w-[100vw]"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
