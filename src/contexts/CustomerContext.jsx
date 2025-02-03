import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { axiosInstance } from "../lib/axios";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const { token } = useAuth(); // Token dari backend
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        const response = await axiosInstance.get("/customers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setCustomers(response.data.data);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = async (newCustomer) => {
        await axiosInstance.post("/customers", newCustomer, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchCustomers();
    };

    const updateCustomer = async (updatedCustomer) => {
        await axiosInstance.put(`/customers`, updatedCustomer, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchCustomers();
    };

    const deleteCustomer = async (id) => {
        await axiosInstance.delete(`/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchCustomers();
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
