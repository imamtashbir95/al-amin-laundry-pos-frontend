import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import BillPicker from "../components/BillPicker";
import ExpenseModal from "../modals/ExpenseModal";
import { useExpense } from "../contexts/useExpense";
import { useTransaction } from "../contexts/useTransaction";
import { ProductProvider } from "../contexts/ProductContext";
import DataTableExpense from "../components/DataTableExpense";
import { CustomerProvider } from "../contexts/CustomerContext";
import DataTableReportIn from "../components/DataTableReportIn";
import PageContentWrapper from "../components/PageContentWrapper";
import DataTableReportOut from "../components/DataTableReportOut";
import DataTableNotPaidOff from "../components/DataTableNotPaidOff";
import DataTableNotTakenYet from "../components/DataTableNotTakenYet";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

const ReportPage = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { fetchTransactionsIn, fetchTransactionsOut, fetchTransactionsNotPaidOff, fetchTransactionsNotTakenYet } =
        useTransaction();
    const { fetchExpenses, deleteExpense } = useExpense();

    const [modalState, setModalState] = useState({
        show: false,
        expense: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        expenseId: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const initialDate = searchParams.get("date") ? dayjs(searchParams.get("date")) : dayjs();
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const handleDateChange = (newDate) => {
        const params = new URLSearchParams(searchParams);
        params.set("date", newDate.format("YYYY-MM-DD"));
        setSearchParams(params);
        setSelectedDate(newDate);
    };

    const fetchTransactionsInMemoized = useCallback((date) => {
        fetchTransactionsIn(date);
    }, []);

    const fetchTransactionsOutMemoized = useCallback((date) => {
        fetchTransactionsOut(date);
    }, []);

    const fetchExpensesMemoized = useCallback((date) => {
        fetchExpenses(date);
    }, []);

    const fetchTransactionsNotPaidOffMemoized = useCallback((date) => {
        fetchTransactionsNotPaidOff(date);
    }, []);

    const fetchTransactionsNotTakenYetMemoized = useCallback((date) => {
        fetchTransactionsNotTakenYet(date);
    }, []);

    useEffect(() => {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        fetchTransactionsInMemoized(formattedDate);
        fetchTransactionsOutMemoized(formattedDate);
        fetchExpensesMemoized(formattedDate);
        fetchTransactionsNotPaidOffMemoized(formattedDate);
        fetchTransactionsNotTakenYetMemoized(formattedDate);
    }, [
        selectedDate,
        fetchTransactionsInMemoized,
        fetchTransactionsOutMemoized,
        fetchExpensesMemoized,
        fetchTransactionsNotPaidOffMemoized,
        fetchTransactionsNotTakenYetMemoized,
    ]);

    useEffect(() => {
        const dateParam = searchParams.get("date");
        if (dateParam) {
            const parsedDate = dayjs(dateParam);
            if (parsedDate.isValid()) setSelectedDate(parsedDate);
        }
    }, [searchParams]);

    useEffect(() => {
        const isModalOpen = modalState.show || confirmationModalState.show;
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalState.show, confirmationModalState.show]);

    const handleOpenModal = (expense = null) => setModalState({ show: true, expense });
    const handleCloseModal = () => setModalState({ show: false, expense: null });

    const handleOpenConfirmationModal = (expenseId = null) => setConfirmationModalState({ show: true, expenseId });

    const handleCloseConfirmationModal = () => setConfirmationModalState({ show: false, expenseId: null });

    const handleDeleteConfirm = () => {
        deleteExpense(confirmationModalState.expenseId, selectedDate.format("YYYY-MM-DD"));
    };

    return (
        <CustomerProvider>
            <ProductProvider>
                <div className="relative flex w-screen max-w-[1920px] flex-col bg-[#fafafa]">
                    <TopBar />
                    {isDesktop && <Sidebar />}
                    <PageContentWrapper>
                        <BillPicker
                            onDateChange={handleDateChange}
                            value={selectedDate}
                            totalRevenue={totalRevenue}
                            totalExpense={totalExpense}
                        />
                        <DataTableReportIn />
                        <DataTableReportOut setTotalRevenue={setTotalRevenue} />
                        <DataTableExpense
                            onAddExpense={handleOpenModal}
                            onDeleteExpense={handleOpenConfirmationModal}
                            setTotalExpense={setTotalExpense}
                        />
                        <DataTableNotPaidOff />
                        <DataTableNotTakenYet />
                    </PageContentWrapper>
                    <FootBar />
                </div>
                <AnimatePresence>
                    {modalState.show && (
                        <>
                            <div className="fixed inset-0 z-10 bg-black opacity-50" onClick={handleCloseModal}></div>
                            <ModalAnimationWrapper>
                                <ExpenseModal onClose={handleCloseModal} expense={modalState.expense} />
                            </ModalAnimationWrapper>
                        </>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {confirmationModalState.show && (
                        <>
                            <div
                                className="fixed inset-0 z-10 bg-black opacity-50"
                                onClick={handleCloseConfirmationModal}
                            ></div>
                            <ModalAnimationWrapper>
                                <DeleteConfirmationModal
                                    onClose={handleCloseConfirmationModal}
                                    onConfirm={handleDeleteConfirm}
                                    entityName={t("entities.expense")}
                                />
                            </ModalAnimationWrapper>
                        </>
                    )}
                </AnimatePresence>
            </ProductProvider>
        </CustomerProvider>
    );
};

export default ReportPage;
