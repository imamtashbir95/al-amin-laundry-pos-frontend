import { lazy, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import SidebarExtender from "../components/SidebarExtender";
import { ProductProvider } from "../contexts/ProductContext";
import { CustomerProvider } from "../contexts/CustomerContext";
import PageContentWrapper from "../components/PageContentWrapper";
import { TransactionProvider } from "../contexts/TransactionContext";
import DataTableTransactions from "../components/DataTableTransactions";
import { AnimatePresence } from "motion/react";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";

const TransactionModal = lazy(() => import("../modals/TransactionModal"));

const TransactionsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const isModalOpen = showModal;
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <TransactionProvider>
            <CustomerProvider>
                <ProductProvider>
                    <div
                        className="relative flex flex-col"
                        style={{
                            filter: showModal ? "blur(5px)" : "none",
                        }}
                    >
                        <TopBar />
                        {isDesktop && <Sidebar />}
                        <PageContentWrapper>
                            <DataTableTransactions
                                onAddTransaction={handleOpenModal}
                            />
                        </PageContentWrapper>
                        <SidebarExtender />
                        <FootBar />
                    </div>
                    <AnimatePresence>
                        {showModal && (
                            <>
                                <div
                                    className="fixed inset-0 z-10 bg-black opacity-50"
                                    onClick={handleCloseModal}
                                ></div>
                                <ModalAnimationWrapper>
                                    <TransactionModal
                                        onClose={handleCloseModal}
                                    />
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
