import { useState } from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { ProductProvider } from "../contexts/ProductContext";
import { TransactionModal } from "../modals/TransactionModal";
import { CustomerProvider } from "../contexts/CustomerContext";
import { TransactionProvider } from "../contexts/TransactionContext";
import DataTableTransactions from "../components/DataTableTransactions";

const TransactionsPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <TransactionProvider>
            <CustomerProvider>
                <ProductProvider>
                    <div
                        className="relative flex flex-col"
                        style={{ filter: showModal ? "blur(5px)" : "none" }}
                    >
                        <TopBar />
                        <Sidebar />
                        <div
                            className="absolute top-[4.167rem] left-[17.5rem] z-10 p-[2.083rem]"
                            style={{ width: "calc(100% - 17.5rem)" }}
                        >
                            <DataTableTransactions
                                onAddTransaction={handleOpenModal}
                            />
                        </div>
                        <div className="h-[12rem] w-[17.5rem]"></div>
                        <FootBar />
                    </div>
                    {showModal && (
                        <>
                            <div
                                className="fixed inset-0 z-10 bg-black opacity-50"
                                onClick={handleCloseModal}
                            ></div>
                            <TransactionModal onClose={handleCloseModal} />
                        </>
                    )}
                </ProductProvider>
            </CustomerProvider>
        </TransactionProvider>
    );
};

export default TransactionsPage;
