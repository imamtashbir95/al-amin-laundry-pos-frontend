import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../lib/axios";
const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
    const { t } = useTranslation();
    const [transactions, setTransactions] = useState([]);
    const [transactionsIn, setTransactionsIn] = useState([]);
    const [transactionsOut, setTransactionsOut] = useState([]);
    const [transactionsNotPaidOff, setTransactionsNotPaidOff] = useState([]);
    const [transactionsNotTakenYet, setTransactionsNotTakenYet] = useState([]);

    const fetchTransactions = async () => {
        try {
            const response = await axiosInstance.get("/bills");
            setTransactions(response.data.data);
        } catch {
            toast.error(t("transaction.fetchTransactions.error"));
        }
    };

    const fetchTransactionsIn = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/in", {
                params: { date },
            });
            setTransactionsIn(response.data.data);
        } catch {
            toast.error(t("transaction.fetchTransactionsIn.error"));
        }
    };

    const fetchTransactionsOut = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/out", {
                params: { date },
            });
            setTransactionsOut(response.data.data);
        } catch {
            toast.error(t("transaction.fetchTransactionsOut.error"));
        }
    };

    const fetchTransactionsNotPaidOff = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/not-paid-off", {
                params: { date },
            });
            setTransactionsNotPaidOff(response.data.data);
        } catch {
            toast.error(t("transaction.fetchTransactionsNotPaidOff.error"));
        }
    };

    const fetchTransactionsNotTakenYet = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/not-taken-yet", {
                params: { date },
            });
            setTransactionsNotTakenYet(response.data.data);
        } catch {
            toast.error(t("transaction.fetchTransactionsNotTakenYet.error"));
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const addTransaction = async (newTransaction) => {
        try {
            await axiosInstance.post("/bills", newTransaction);
            toast.success(t("transaction.addTransaction.created"));
            fetchTransactions();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("transaction.addTransaction.notFound"));
            } else {
                toast.error(t("transaction.addTransaction.error"));
            }
        }
    };

    const updateTransaction = async (updatedTransaction) => {
        try {
            await axiosInstance.put("/bills", updatedTransaction);
            toast.success(t("transaction.updateTransaction.created"));
            fetchTransactions();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("transaction.updateTransaction.notFound"));
            } else {
                toast.error(t("transaction.updateTransaction.error"));
            }
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axiosInstance.delete(`/bills/${id}`);
            toast.success(t("transaction.deleteTransaction.deleted"));
            fetchTransactions();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("transaction.deleteTransaction.notFound"));
            } else {
                toast.error(t("transaction.deleteTransaction.error"));
            }
        }
    };

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                transactionsIn,
                fetchTransactionsIn,
                transactionsOut,
                fetchTransactionsOut,
                transactionsNotPaidOff,
                fetchTransactionsNotPaidOff,
                transactionsNotTakenYet,
                fetchTransactionsNotTakenYet,
                addTransaction,
                updateTransaction,
                deleteTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

TransactionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { TransactionContext, TransactionProvider };
