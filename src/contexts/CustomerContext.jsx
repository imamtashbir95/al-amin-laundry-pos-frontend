import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axiosInstance.get("/customers");
            setCustomers(response.data.data);
        } catch {
            toast.error("Gagal mengambil data pelanggan.");
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = async (newCustomer) => {
        try {
            await axiosInstance.post("/customers", newCustomer);
            toast.success("Berhasil menambah data pelanggan.");
            fetchCustomers();
        } catch {
            toast.error("Gagal menambah data pelanggan.");
        }
    };

    const updateCustomer = async (updatedCustomer) => {
        try {
            await axiosInstance.put(`/customers`, updatedCustomer);
            toast.success("Berhasil memperbarui data pelanggan.");
            fetchCustomers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Pelanggan tidak ditemukan.");
            } else {
                toast.error("Gagal memperbarui data pelanggan.");
            }
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axiosInstance.delete(`/customers/${id}`);
            toast.success("Berhasil menghapus data pelanggan.");
            fetchCustomers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Pelanggan tidak ditemukan.");
            } else {
                toast.error("Gagal menghapus data pelanggan.");
            }
        }
    };

    return (
        <CustomerContext.Provider
            value={{ customers, addCustomer, updateCustomer, deleteCustomer }}
        >
            {children}
        </CustomerContext.Provider>
    );
};

CustomerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { CustomerContext };
