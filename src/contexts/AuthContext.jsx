import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            try {
                setUser(jwtDecode(token));
            } catch {
                setUser(null);
                toast.error("Token tidak valid.");
            }
        } else {
            setUser(null);
            localStorage.removeItem("token");
        }
    }, [token]);

    const signIn = async (signInData) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 300000);

        try {
            const response = await axiosInstance.post(
                "/auth/login",
                signInData,
                { signal: controller.signal },
            );

            clearTimeout(timeout);
            if (response.data?.data.token) {
                setToken(response.data.data.token);
                return { success: true, timeout: false };
            }
        } catch (error) {
            if (error.name === "CanceledError") {
                return { success: false, timeout: true };
            } else if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Username atau kata sandi salah.");
                console.log(error);
            } else {
                toast.error("Gagal terhubung ke server!");
                console.log(error);
            }
            return { success: false, timeout: false };
        }
    };

    const signUp = async (signUpData) => {
        try {
            const response = await axiosInstance.post(
                "/auth/register",
                signUpData,
            );

            if (response.data?.status.code === 201) {
                toast.success("Pengguna berhasil didaftarkan!");
                return true;
            }
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Username atau e-mail sudah ada.");
                return false;
            } else {
                toast.error("Gagal terhubung ke server!");
                return false;
            }
        }
    };

    const signOut = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext };
