import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";
import dayjs from "dayjs";

const ExpenseContext = createContext();

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

    // useEffect(() => {
    //     fetchExpenses(date);
    // }, [date]);

    const addExpense = async (newExpense) => {
        const newDate = dayjs(newExpense.expenseDate);
        const formattedDate = newDate.format("YYYY-MM-DD");

        try {
            await axiosInstance.post("/expenses", newExpense);
            toast.success("Berhasil menambah data pengeluaran.");
            fetchExpenses(formattedDate);
        } catch {
            toast.error("Gagal menambah data pengeluaran.");
        }
    };

    const updateExpense = async (updatedExpense) => {
        const newDate = dayjs(updatedExpense.expenseDate);
        const formattedDate = newDate.format("YYYY-MM-DD");

        try {
            await axiosInstance.put(`/expenses`, updatedExpense);
            toast.success("Berhasil memperbarui data pengeluaran.");
            fetchExpenses(formattedDate);
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Pengeluaran tidak ditemukan.");
            } else {
                toast.error("Gagal memperbarui data pengeluaran.");
            }
        }
    };

    const deleteExpense = async (id, date) => {
        try {
            await axiosInstance.delete(`/expenses/${id}`);
            toast.success("Berhasil menghapus data pengeluaran.");
            fetchExpenses(date);
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

export { ExpenseContext };
