import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence } from "motion/react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import BillPicker from "../components/BillPicker";
import ExpenseModal from "../modals/ExpenseModal";
import { ExpenseContext } from "../contexts/ExpenseContext";
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
import { useSearchParams } from "react-router-dom";
import { TransactionContext } from "../contexts/TransactionContext";

const ReportPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        fetchTransactionsIn,
        fetchTransactionsOut,
        fetchTransactionsNotPaidOff,
        fetchTransactionsNotTakenYet,
    } = useContext(TransactionContext);
    const { fetchExpenses } = useContext(ExpenseContext);
    const { deleteExpense } = useContext(ExpenseContext);

    const [modalState, setModalState] = useState({
        show: false,
        expense: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        expenseId: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const initialDate = searchParams.get("date")
        ? dayjs(searchParams.get("date"))
        : dayjs();
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const handleDateChange = (newDate) => {
        const params = new URLSearchParams(searchParams);
        params.set("date", newDate.format("YYYY-MM-DD"));
        setSearchParams(params);
        setSelectedDate(newDate);
    };

    useEffect(() => {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        fetchTransactionsIn(formattedDate);
        fetchTransactionsOut(formattedDate);
        fetchExpenses(formattedDate);
        fetchTransactionsNotPaidOff(formattedDate);
        fetchTransactionsNotTakenYet(formattedDate);
    }, [selectedDate]);

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

    const handleOpenModal = (expense = null) =>
        setModalState({ show: true, expense });
    const handleCloseModal = () =>
        setModalState({ show: false, expense: null });

    const handleOpenConfirmationModal = (expenseId = null) =>
        setConfirmationModalState({ show: true, expenseId });

    const handleCloseConfirmationModal = () =>
        setConfirmationModalState({ show: false, expenseId: null });

    const handleDeleteConfirm = () => {
        deleteExpense(confirmationModalState.expenseId);
    };

    return (
        <CustomerProvider>
            <ProductProvider>
                <div
                    className="relative flex flex-col bg-[#fafafa]"
                    // style={{
                    //     filter:
                    //         modalState.show || confirmationModalState.show
                    //             ? "blur(5px)"
                    //             : "none",
                    // }}
                >
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
                            <div
                                className="fixed inset-0 z-10 bg-black opacity-50"
                                onClick={handleCloseModal}
                            ></div>
                            <ModalAnimationWrapper>
                                <ExpenseModal
                                    onClose={handleCloseModal}
                                    expense={modalState.expense}
                                />
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
                                    entityName="pengeluaran"
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
