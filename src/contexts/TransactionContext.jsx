import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const { token } = useAuth(); // Token dari backend
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const response = await axiosInstance.get("/bills", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setTransactions(response.data.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const addTransaction = async (newTransaction) => {
        await axiosInstance.post("/bills", newTransaction, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchTransactions();
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};

TransactionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
