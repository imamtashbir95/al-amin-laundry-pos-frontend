import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const response = await axiosInstance.get("/bills");
            setTransactions(response.data.data);
        } catch (err) {
            toast.error("Gagal mengambil data transaksi.");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const addTransaction = async (newTransaction) => {
        try {
            await axiosInstance.post("/bills", newTransaction);
            fetchTransactions();
        } catch (err) {
            toast.error("Gagal menambah data transaksi.");
        }
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
