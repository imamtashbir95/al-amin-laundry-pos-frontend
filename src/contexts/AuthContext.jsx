import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../lib/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            try {
                const decoded = jwtDecode(token);

                // Check if the token has expired
                if (decoded.exp * 1000 < Date.now()) {
                    setUser(null);
                    toast.error(t("auth.sessionExpired"));
                    localStorage.removeItem("token");
                    setLoading(false);
                    return;
                }

                setUser(decoded);
            } catch (error) {
                // Handle invalid token
                setUser(null);
                localStorage.removeItem("token");

                if (error.message.includes("invalid signature")) {
                    toast.error(t("auth.invalidSignature"));
                } else if (error.message.includes("expired")) {
                    toast.error(t("auth.tokenExpired"));
                } else {
                    toast.error(t("auth.invalidToken"));
                }
            }
        } else {
            setUser(null);
            localStorage.removeItem("token");
        }
        setLoading(false);
    }, [token]);

    const signIn = async (signInData) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 300000);

        try {
            const response = await axiosInstance.post("/auth/login", signInData, { signal: controller.signal });

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
                toast.error(t("auth.signIn.unauthorized"));
            } else {
                toast.error(t("auth.signIn.internalServerError"));
            }
            return { success: false, timeout: false };
        }
    };

    const signUp = async (signUpData) => {
        try {
            const response = await axiosInstance.post("/auth/register", signUpData);

            if (response.data?.status.code === 201) {
                toast.success(t("auth.signUp.created"));
                return true;
            }
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("auth.signUp.unauthorized"));
                return false;
            } else {
                toast.error(t("auth.signUp.internalServerError"));
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
                loading,
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

export { AuthContext, AuthProvider };
