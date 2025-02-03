import { useState } from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { CustomerModal } from "../modals/CustomerModal";
import { CustomerProvider } from "../contexts/CustomerContext";
import DataTableCustomers from "../components/DataTableCustomers";

const CustomersPage = () => {
    const [modalState, setModalState] = useState({
        show: false,
        product: null,
    });

    const handleOpenModal = (customer = null) =>
        setModalState({ show: true, customer });
    const handleCloseModal = () =>
        setModalState({ show: false, product: null });

    return (
        <CustomerProvider>
            <div
                className="relative flex flex-col"
                style={{ filter: modalState.show ? "blur(5px)" : "none" }}
            >
                <TopBar />
                <Sidebar />
                <div
                    className="absolute top-[4.167rem] left-[17.5rem] z-10 p-[2.083rem]"
                    style={{ width: "calc(100% - 17.5rem)" }}
                >
                    <DataTableCustomers onAddCustomer={handleOpenModal} />
                </div>
                <div className="h-[12rem] w-[17.5rem]"></div>
                <FootBar />
            </div>
            {modalState.show && (
                <>
                    <div
                        className="fixed inset-0 z-10 bg-black opacity-50"
                        onClick={handleCloseModal}
                    ></div>
                    <CustomerModal
                        onClose={handleCloseModal}
                        customer={modalState.customer}
                    />
                </>
            )}
        </CustomerProvider>
    );
};

export default CustomersPage;
