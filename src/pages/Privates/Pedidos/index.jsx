import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { api } from "../../../services/api";

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [status, setStatus] = useState([]);
    const [msg, setMsg] = useState("");
    const [massa, setMassa] = useState("");
    const [borda, setBorda] = useState("");
    const [sabor, setSabor] = useState("");

    const loadPedidos = () => {
        api.get("/pizza/pedidos").then((response) => {
            setPedidos(response.data);
        });
    };

    useEffect(() => {
        const msgTimeout = () => {
            setTimeout(() => {
                setMsg("");
            }, 5 * 1000); // 5 seconds
        };
        msgTimeout();
    }, [msg]);

    useEffect(() => {
        loadPedidos();
        api.get("/pizza/status").then((response) => {
            setStatus(response.data);
        });
    }, []);

    const handleStatus = (e, id) => {
        e.preventDefault();
        api.put(`/pizza/pedidos/${id}`, { status: e.target.value }).then(() => {
            loadPedidos();
        });
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        api.delete(`/pizza/delete/${id}`).then(() => {
            loadPedidos();
        });
    };

    const handleAddMassa = (e) => {
        e.preventDefault();
        api.post(`/pizza/massa`, { massa }).then(() => {
            setMsg("Massa adicionada com sucesso");
        });
    };

    const handleAddBorda = (e) => {
        e.preventDefault();
        api.post(`/pizza/borda`, { borda }).then(() => {
            setMsg("Borda adicionada com sucesso");
        });
    };

    const handleAddSabor = (e) => {
        e.preventDefault();
        api.post(`/pizza/sabor`, { sabor }).then(() => {
            setMsg("Sabor adicionado com sucesso");
        });
    };

    return (
        <>
            <Navbar />
            <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
                <h1 className="text-3xl font-bold">Pedidos</h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-4 px-6 md:min-w-full lg:px-8">
                            <div className="overflow-hidden">
                                <table className="w-full">
                                    <thead className="border-b bg-white">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-lg text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                Nome
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-lg text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                Massa
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-lg text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                Borda
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-lg text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                Sabores
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-lg text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                Endereço
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-lg text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-lg text-gray-800 px-6 py-4 hidden lg:table-cell"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-gray-600 border-b-1">
                                        {pedidos?.map((pedido, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white border-b border-gray-300 flex justify-between lg:table-row flex-row lg:flex-row flex-wrap mb-10 lg:mb-0"
                                            >
                                                <td className="w-full text-center lg:w-auto flex items-center justify-center px-6 py-4 text-sm font-medium text-gray-900  lg:table-cell">
                                                    <span className="flex lg:hidden px-2 py-1 text-xs font-bold uppercase self-start">
                                                        #
                                                    </span>
                                                    {pedido.id}
                                                </td>
                                                <td className="w-full text-center flex justify-center lg:w-auto px-6 py-4 text-sm font-medium text-gray-900  lg:table-cell">
                                                    <span className="lg:hidden  px-2 py-1 text-xs font-bold uppercase">
                                                        Nome
                                                    </span>
                                                    {pedido.user}
                                                </td>
                                                <td className="w-full text-center lg:w-auto flex items-center justify-center px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                                                    <span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
                                                        Massa
                                                    </span>
                                                    {pedido.massa}
                                                </td>
                                                <td className="w-full text-center flex items-center justify-center lg:w-auto px-6 py-4 text-sm font-medium text-gray-900  lg:table-cell">
                                                    <span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
                                                        Borda
                                                    </span>
                                                    {pedido.borda}
                                                </td>
                                                <td className="w-full text-center flex items-center justify-center lg:w-auto px-6 py-4 text-sm font-medium text-gray-900  lg:table-cell">
                                                    <span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
                                                        Sabores
                                                    </span>
                                                    {pedido.sabores.map(
                                                        (sabor, index) => {
                                                            return index ===
                                                                pedido.sabores
                                                                    .length -
                                                                    1
                                                                ? sabor
                                                                : sabor + ", ";
                                                        }
                                                    )}
                                                </td>
                                                <td className="w-full text-center flex items-center justify-center lg:w-auto px-6 py-4 text-sm font-medium text-gray-900  lg:table-cell">
                                                    <span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
                                                        Endereço
                                                    </span>
                                                    {pedido.endereco}
                                                </td>
                                                <td className="w-full text-center lg:w-auto px-6 py-4 text-sm font-medium text-gray-900  lg:table-cell">
                                                    <span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
                                                        Status
                                                    </span>
                                                    {pedido.status}
                                                </td>
                                                <td className="w-full text-center lg:w-auto text-sm justify-between flex-col items-center text-gray-900 font-bold px-6 py-4 space-x-4  lg:table-cell">
                                                    <span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
                                                        Actions
                                                    </span>
                                                    <div>
                                                        <select
                                                            className="bg-white border border-gray-300 rounded-md shadow-sm py-1  focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                                            value={
                                                                pedido.idStatus
                                                            }
                                                            onChange={(e) =>
                                                                handleStatus(
                                                                    e,
                                                                    pedido.id
                                                                )
                                                            }
                                                        >
                                                            {status.map(
                                                                (
                                                                    status,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            status.idStatus
                                                                        }
                                                                    >
                                                                        {
                                                                            status.tipo
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                        <button
                                                            onClick={(e) =>
                                                                handleDelete(
                                                                    e,
                                                                    pedido.id
                                                                )
                                                            }
                                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly w-full flex-wrap">
                    <div>
                        <input
                            type="text"
                            name="massa"
                            id="massa"
                            placeholder="Insira uma nova massa"
                            value={massa}
                            onChange={(e) => setMassa(e.target.value)}
                            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                        <button
                            onClick={(e) => handleAddMassa(e)}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1 rounded"
                        >
                            Adicionar
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="borda"
                            id="borda"
                            placeholder="Insira uma nova borda"
                            value={borda}
                            onChange={(e) => setBorda(e.target.value)}
                            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                        <button
                            onClick={(e) => handleAddBorda(e)}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1 rounded"
                        >
                            Adicionar
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="sabor"
                            id="sabor"
                            placeholder="Insira um novo sabor"
                            value={sabor}
                            onChange={(e) => setSabor(e.target.value)}
                            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                        <button
                            onClick={(e) => handleAddSabor(e)}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1 rounded"
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <label htmlFor=""> {msg} </label>
            </div>
        </>
    );
};

export default Pedidos;
