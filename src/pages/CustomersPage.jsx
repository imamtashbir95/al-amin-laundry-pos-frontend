import { lazy, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { useCustomer } from "../contexts/useCustomer";
import DataTableCustomers from "../components/DataTableCustomers";
import PageContentWrapper from "../components/PageContentWrapper";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";
import { AnimatePresence } from "motion/react";

const CustomerModal = lazy(() => import("../modals/CustomerModal"));
const DeleteConfirmationModal = lazy(() => import("../modals/DeleteConfirmationModal"));

const CustomersPage = () => {
    const { deleteCustomer } = useCustomer();

    const [modalState, setModalState] = useState({
        show: false,
        customer: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        customerId: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const isModalOpen = modalState.show || confirmationModalState.show;
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalState.show, confirmationModalState.show]);

    const handleOpenModal = (customer = null) => setModalState({ show: true, customer });
    const handleCloseModal = () => setModalState({ show: false, customer: null });

    const handleOpenConfirmationModal = (customerId = null) => setConfirmationModalState({ show: true, customerId });

    const handleCloseConfirmationModal = () => setConfirmationModalState({ show: false, customerId: null });

    const handleDeleteConfirm = () => {
        deleteCustomer(confirmationModalState.customerId);
    };

    return (
        <>
            <div className="relative flex flex-col bg-[#fafafa]">
                <TopBar />
                {isDesktop && <Sidebar />}
                <PageContentWrapper>
                    <DataTableCustomers
                        onAddCustomer={handleOpenModal}
                        onDeleteCustomer={handleOpenConfirmationModal}
                    />
                </PageContentWrapper>
                <FootBar />
            </div>
            <AnimatePresence>
                {modalState.show && (
                    <>
                        <div className="fixed inset-0 z-10 bg-black opacity-50" onClick={handleCloseModal}></div>
                        <ModalAnimationWrapper>
                            <CustomerModal onClose={handleCloseModal} customer={modalState.customer} />
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
                                entityName="pelanggan"
                            />
                        </ModalAnimationWrapper>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CustomersPage;
