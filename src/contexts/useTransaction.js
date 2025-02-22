import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";

export const useTransaction = () => useContext(TransactionContext);
