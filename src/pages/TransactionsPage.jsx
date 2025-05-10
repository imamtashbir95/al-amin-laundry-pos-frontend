import { lazy, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { ProductProvider } from "../contexts/ProductContext";
import { CustomerProvider } from "../contexts/CustomerContext";
import PageContentWrapper from "../components/PageContentWrapper";
import { TransactionProvider } from "../contexts/TransactionContext";
import DataTableTransactions from "../components/DataTableTransactions";
import { AnimatePresence } from "motion/react";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";

const TransactionModal = lazy(() => import("../modals/TransactionModal"));

const TransactionsPage = () => {
    const [modalState, setModalState] = useState({
        show: false,
        transaction: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const isModalOpen = modalState.show;
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalState.show]);

    const handleOpenModal = (transaction = null) => setModalState({ show: true, transaction });
    const handleCloseModal = () => setModalState({ show: false, transaction: null });

    return (
        <TransactionProvider>
            <CustomerProvider>
                <ProductProvider>
                    <div className="relative flex w-screen max-w-[1920px] flex-col bg-[#fafafa]">
                        <TopBar />
                        {isDesktop && <Sidebar />}
                        <PageContentWrapper>
                            <DataTableTransactions onAddTransaction={() => handleOpenModal(null)} />
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
                                    <TransactionModal onClose={handleCloseModal} transaction={modalState.transaction} />
                                </ModalAnimationWrapper>
                            </>
                        )}
                    </AnimatePresence>
                </ProductProvider>
            </CustomerProvider>
        </TransactionProvider>
    );
};

export default TransactionsPage;
