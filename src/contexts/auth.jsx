import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadingStorageData = async () => {
        const userToken = localStorage.getItem("@Auth:token");
        const user = localStorage.getItem("@Auth:user");

        if (userToken && user) {
            setUser(JSON.parse(user));
        }
    };

    useEffect(() => {
        (async () => {
            const userToken = localStorage.getItem("@Auth:token");
            const user = localStorage.getItem("@Auth:user");

            if (userToken && user) {
                api.defaults.headers.Authorization = `Bearer ${userToken}`;
                setUser(JSON.parse(user));
            }
        })();
    }, []);

    const signin = async ({ email, password }) => {
        const response = await api.post("/login", { email, password });
        if (response.data.error) {
            return;
        } else {
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem(
                "@Auth:user",
                JSON.stringify(response.data.user)
            );
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            loadingStorageData();

            setUser(response.data.user);
        }
    };

    const signout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signed: !!user,
                signin,
                signout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
