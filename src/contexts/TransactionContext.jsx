import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
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
            toast.error("Gagal mengambil data transaksi.");
        }
    };

    const fetchTransactionsIn = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/in", {
                params: { date },
            });
            setTransactionsIn(response.data.data);
        } catch {
            toast.error("Gagal mengambil data transaksi masuk.");
        }
    };

    const fetchTransactionsOut = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/out", {
                params: { date },
            });
            setTransactionsOut(response.data.data);
        } catch {
            toast.error("Gagal mengambil data transaksi keluar.");
        }
    };

    const fetchTransactionsNotPaidOff = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/not-paid-off", {
                params: { date },
            });
            setTransactionsNotPaidOff(response.data.data);
        } catch {
            toast.error("Gagal mengambil data transaksi belum dibayar.");
        }
    };

    const fetchTransactionsNotTakenYet = async (date) => {
        try {
            const response = await axiosInstance.get("/bills/report/not-taken-yet", {
                params: { date },
            });
            setTransactionsNotTakenYet(response.data.data);
        } catch {
            toast.error("Gagal mengambil data barang belum diambil.");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const addTransaction = async (newTransaction) => {
        try {
            await axiosInstance.post("/bills", newTransaction);
            toast.success("Berhasil menambah data transaksi.");
            fetchTransactions();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Pelanggan atau karyawan tidak ditemukan.");
            } else {
                toast.error("Gagal menambah data transaksi.");
            }
        }
    };

    const updateTransaction = async (updatedTransaction) => {
        try {
            await axiosInstance.put("/bills", updatedTransaction);
            toast.success("Berhasil memperbarui data transaksi.");
            fetchTransactions();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Transaksi tidak ditemukan.");
            } else {
                toast.error("Gagal menambah data transaksi.");
            }
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axiosInstance.delete(`/bills/${id}`);
            toast.success("Berhasil menghapus data transaksi.");
            fetchTransactions();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Transaksi tidak ditemukan.");
            } else {
                toast.error("Gagal menghapus data transaksi.");
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

export { TransactionContext };
