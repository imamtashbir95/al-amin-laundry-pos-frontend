import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axiosInstance.get("/customers");
            setCustomers(response.data.data);
        } catch (err) {
            toast.error("Gagal mengambil data pelanggan.");
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = async (newCustomer) => {
        try {
            await axiosInstance.post("/customers", newCustomer);
            fetchCustomers();
        } catch (err) {
            toast.error("Gagal menambah data pelanggan.");
        }
    };

    const updateCustomer = async (updatedCustomer) => {
        try {
            await axiosInstance.put(`/customers`, updatedCustomer);
            fetchCustomers();
        } catch (err) {
            toast.error("Gagal memperbarui data pelanggan.");
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axiosInstance.delete(`/customers/${id}`);
            fetchCustomers();
        } catch (err) {
            toast.error("Gagal menghapus data pelanggan.");
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
