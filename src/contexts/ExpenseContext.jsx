import { createContext, useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../lib/axios";

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
    const { t } = useTranslation();
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async (date) => {
        try {
            const response = await axiosInstance.get("/expenses/date", {
                params: { date },
            });
            setExpenses(response.data.data);
        } catch {
            toast.error(t("expense.fetchExpenses.error"));
        }
    };

    const addExpense = async (newExpense) => {
        const newDate = dayjs(newExpense.expenseDate);
        const formattedDate = newDate.format("YYYY-MM-DD");

        try {
            await axiosInstance.post("/expenses", newExpense);
            toast.success(t("expense.addExpense.created"));
            fetchExpenses(formattedDate);
        } catch {
            toast.error(t("expense.addExpense.error"));
        }
    };

    const updateExpense = async (updatedExpense) => {
        const newDate = dayjs(updatedExpense.expenseDate);
        const formattedDate = newDate.format("YYYY-MM-DD");

        try {
            await axiosInstance.put(`/expenses`, updatedExpense);
            toast.success(t("expense.updateExpense.created"));
            fetchExpenses(formattedDate);
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("expense.updateExpense.notFound"));
            } else {
                toast.error(t("expense.updateExpense.error"));
            }
        }
    };

    const deleteExpense = async (id, date) => {
        try {
            await axiosInstance.delete(`/expenses/${id}`);
            toast.success(t("expense.deleteExpense.deleted"));
            fetchExpenses(date);
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("expense.deleteExpense.notFound"));
            } else {
                toast.error(t("expense.deleteExpense.error"));
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

export { ExpenseContext, ExpenseProvider };
