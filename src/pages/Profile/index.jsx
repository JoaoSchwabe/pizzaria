import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import { api } from "../../services/api";

const Profile = () => {
    const { user, signout } = useAuth();

    const [pedidos, setPedidos] = useState();

    const handleSignout = () => {
        signout();
    };

    useEffect(() => {
        api.get("/pizza/profile").then((response) => {
            console.log(response.data);
            setPedidos(response.data);
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-1 flex-col items-center">
                <div className="flex flex-col w-full max-w-md mx-auto">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-lg">Seu perfil</h1>
                        <p>Nome: {user.name} </p>
                        <p>Email: {user.email} </p>
                        <button
                            className="my-5 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSignout}
                        >
                            Sair
                        </button>
                    </div>
                </div>
                <div className={pedidos?.length > 0 ? "" : "hidden"}>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-4 px-6 md:min-w-full lg:px-8 text-center">
                            <p>Veja aqui seu pedido!</p>
                            <p>
                                Atualize a página para acompanhar o status do
                                pedido
                            </p>
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
                                                Status
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
                                                <td className="w-full text-center lg:w-auto px-6 py-4 text-sm font-medium text-gray-900  lg:table-cell">
                                                    <span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
                                                        Status
                                                    </span>
                                                    {pedido.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
