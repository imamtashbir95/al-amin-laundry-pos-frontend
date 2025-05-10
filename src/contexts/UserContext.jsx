import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../lib/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("/users");
            setUsers(response.data.data);
        } catch {
            toast.error(t("user.fetchUsers.error"));
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const registerUser = async (newUser) => {
        try {
            await axiosInstance.post("/users", newUser);
            toast.success(t("user.registerUser.created"));
            fetchUsers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("user.registerUser.conflict"));
            } else {
                toast.error(t("user.registerUser.error"));
            }
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            await axiosInstance.put(`/users`, updatedUser);
            toast.success(t("user.updateUser.created"));
            fetchUsers();
        } catch (error) {
            if (error.response) {
                if (error.response.data.error === "User not found") {
                    toast.error(t("user.updateUser.notFound"));
                }
                if (error.response.data.error === "Username or email already exists") {
                    toast.error(t("user.updateUser.conflict"));
                }
            } else {
                toast.error(t("user.updateUser.error"));
            }
        }
    };

    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/users/${id}`);
            toast.success(t("user.deleteUser.deleted"));
            fetchUsers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("user.deleteUser.notFound"));
            } else {
                toast.error(t("user.deleteUser.error"));
            }
        }
    };

    return (
        <UserContext.Provider value={{ users, registerUser, updateUser, deleteUser }}>{children}</UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { UserContext };
