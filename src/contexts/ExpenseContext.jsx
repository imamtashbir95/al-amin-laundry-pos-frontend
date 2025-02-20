import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async (date) => {
        try {
            const response = await axiosInstance.get("/expenses/date", {
                params: { date },
            });
            setExpenses(response.data.data);
        } catch {
            toast.error("Gagal mengambil data pengeluaran.");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const addExpense = async (newExpense) => {
        try {
            await axiosInstance.post("/expenses", newExpense);
            toast.success("Berhasil menambah data pengeluaran.");
            fetchExpenses();
        } catch {
            toast.error("Gagal menambah data pengeluaran.");
        }
    };

    const updateExpense = async (updatedExpense) => {
        try {
            await axiosInstance.put(`/expenses`, updatedExpense);
            toast.success("Berhasil memperbarui data pengeluaran.");
            fetchExpenses();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Pengeluaran tidak ditemukan.");
            } else {
                toast.error("Gagal memperbarui data pengeluaran.");
            }
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(`/expenses/${id}`);
            toast.success("Berhasil menghapus data pengeluaran.");
            fetchExpenses();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Pengeluaran tidak ditemukan.");
            } else {
                toast.error("Gagal menghapus data pengeluaran.");
            }
        }
    };

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                fetchExpenses,
                addExpense,
                updateExpense,
                deleteExpense,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

ExpenseProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
