import { lazy, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence } from "motion/react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { ProductProvider } from "../contexts/ProductContext";
import { CustomerProvider } from "../contexts/CustomerContext";
import PageContentWrapper from "../components/PageContentWrapper";
import { TransactionContext } from "../contexts/TransactionContext";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";
import DataTableDetailsTransaction from "../components/DataTableDetailsTransaction";

const TransactionModal = lazy(() => import("../modals/TransactionModal"));
const DeleteConfirmationModal = lazy(
    () => import("../modals/DeleteConfirmationModal"),
);

const TransactionDetailsPage = () => {
    const { deleteTransaction } = useContext(TransactionContext);

    const [modalState, setModalState] = useState({
        show: false,
        transaction: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        transaction: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const isModalOpen = modalState.show || confirmationModalState.show;
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalState.show, confirmationModalState.show]);

    const handleOpenModal = (transaction = null) =>
        setModalState({ show: true, transaction });
    const handleCloseModal = () =>
        setModalState({ show: false, transaction: null });

    const handleOpenConfirmationModal = (transactionId = null) =>
        setConfirmationModalState({ show: true, transactionId });

    const handleCloseConfirmationModal = () =>
        setConfirmationModalState({ show: false, transactionId: null });

    const handleDeleteConfirm = () => {
        deleteTransaction(confirmationModalState.transactionId);
    };

    return (
        <CustomerProvider>
            <ProductProvider>
                <div className="relative flex flex-col bg-[#fafafa]">
                    <TopBar />
                    {isDesktop && <Sidebar />}
                    <PageContentWrapper>
                        <DataTableDetailsTransaction
                            onAddTransaction={handleOpenModal}
                            onDeleteTransaction={handleOpenConfirmationModal}
                        />
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
                                <TransactionModal
                                    onClose={handleCloseModal}
                                    transaction={modalState.transaction}
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
                                    entityName="transaksi"
                                />
                            </ModalAnimationWrapper>
                        </>
                    )}
                </AnimatePresence>
            </ProductProvider>
        </CustomerProvider>
    );
};

export default TransactionDetailsPage;
