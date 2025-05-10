import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../lib/axios";

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
    const { t } = useTranslation();
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axiosInstance.get("/customers");
            setCustomers(response.data.data);
        } catch {
            toast.error(t("customer.fetchCustomers.error"));
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = async (newCustomer) => {
        try {
            await axiosInstance.post("/customers", newCustomer);
            toast.success(t("customer.addCustomer.created"));
            fetchCustomers();
        } catch {
            toast.error(t("customer.addCustomer.error"));
        }
    };

    const updateCustomer = async (updatedCustomer) => {
        try {
            await axiosInstance.put(`/customers`, updatedCustomer);
            toast.success(t("customer.updateCustomer.created"));
            fetchCustomers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("customer.updateCustomer.notFound"));
            } else {
                toast.error(t("customer.updateCustomer.error"));
            }
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axiosInstance.delete(`/customers/${id}`);
            toast.success(t("customer.deleteCustomer.deleted"));
            fetchCustomers();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("customer.deleteCustomer.notFound"));
            } else {
                toast.error(t("customer.deleteCustomer.error"));
            }
        }
    };

    return (
        <CustomerContext.Provider value={{ customers, addCustomer, updateCustomer, deleteCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};

CustomerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { CustomerContext, CustomerProvider };
