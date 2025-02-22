import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("/users");
            setUsers(response.data.data);
        } catch {
            toast.error("Gagal mengambil data karyawan.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const registerUser = async (newUser) => {
        try {
            await axiosInstance.post("/users", newUser);
            toast.success("Berhasil menambah data karyawan.");
            fetchUsers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Username atau e-mail sudah ada.");
            } else {
                toast.error("Gagal menambah data karyawan.");
            }
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            await axiosInstance.put(`/users`, updatedUser);
            toast.success("Berhasil memperbarui data karyawan.");
            fetchUsers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Karyawan tidak ditemukan.");
            } else {
                toast.error("Gagal memperbarui data karyawan.");
            }
        }
    };

    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/users/${id}`);
            toast.success("Berhasil menghapus data karyawan.");
            fetchUsers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Karyawan tidak ditemukan.");
            } else {
                toast.error("Gagal menghapus data karyawan.");
            }
        }
    };

    return (
        <UserContext.Provider
            value={{ users, registerUser, updateUser, deleteUser }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { UserContext };
