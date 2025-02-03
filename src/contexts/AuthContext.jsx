import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const signIn = async (username, password, newToken) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                username,
                password,
            });

            if (response.data?.data.token) {
                setToken(response.data.data.token || newToken);
                setError("");
                console.log(response);
                return true;
            } else {
                setError("Username atau Kata Sandi salah");
                return false;
            }
        } catch (err) {
            toast.error("Gagal terhubung ke server!");
            return false;
        }
    };

    const signUp = async (name, email, username, password, role) => {
        try {
            const response = await axiosInstance.post("/auth/register", {
                name,
                email,
                username,
                password,
                role,
            });

            if (response.data?.status.code === 201) {
                toast.success("Pengguna berhasil didaftarkan!");
                return true;
            }
        } catch (err) {
            toast.error("Gagal terhubung ke server!");
            return false;
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
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
