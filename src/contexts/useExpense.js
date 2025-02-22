import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";

export const useExpense = () => useContext(ExpenseContext);
