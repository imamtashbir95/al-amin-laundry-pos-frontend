import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { ProductModal } from "../modals/ProductModal";
import { ProductProvider } from "../contexts/ProductContext";
import DataTableProducts from "../components/DataTableProducts";
import { useState } from "react";

const ProductsPage = () => {
    const [modalState, setModalState] = useState({
        show: false,
        product: null,
    });

    const handleOpenModal = (product = null) =>
        setModalState({ show: true, product });
    const handleCloseModal = () =>
        setModalState({ show: false, product: null });

    return (
        <ProductProvider>
            <div
                className="relative flex flex-col"
                style={{ filter: modalState.show ? "blur(5px)" : "none" }}
            >
                <TopBar />
                <Sidebar />
                <div
                    className="absolute top-[4.167rem] left-[18.75rem] z-10 p-[2.083rem]"
                    style={{ width: "calc(100% - 18.75rem)" }}
                >
                    <DataTableProducts onAddProduct={handleOpenModal} />
                </div>
                <div className="h-[12rem] w-[18.75rem]"></div>
                <FootBar />
            </div>
            {modalState.show && (
                <>
                    <div
                        className="fixed inset-0 z-10 bg-black opacity-50"
                        onClick={handleCloseModal}
                    ></div>
                    <ProductModal
                        onClose={handleCloseModal}
                        product={modalState.product}
                    />
                </>
            )}
        </ProductProvider>
    );
};

export default ProductsPage;
