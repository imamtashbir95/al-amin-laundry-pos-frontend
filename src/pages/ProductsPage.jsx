import { lazy, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { ProductContext } from "../contexts/ProductContext";
import SidebarExtender from "../components/SidebarExtender";
import DataTableProducts from "../components/DataTableProducts";
import PageContentWrapper from "../components/PageContentWrapper";

const ProductModal = lazy(() => import("../modals/ProductModal"));
const DeleteConfirmationModal = lazy(() => import("../modals/DeleteConfirmationModal"));

const ProductsPage = () => {
    const { deleteProduct } = useContext(ProductContext);

    const [modalState, setModalState] = useState({
        show: false,
        product: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        productId: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const handleOpenModal = (product = null) =>
        setModalState({ show: true, product });
    const handleCloseModal = () =>
        setModalState({ show: false, product: null });

    const handleOpenConfirmationModal = (productId = null) =>
        setConfirmationModalState({ show: true, productId });

    const handleCloseConfirmationModal = () =>
        setConfirmationModalState({ show: false, productId: null });

    const handleDeleteConfirm = () => {
        deleteProduct(confirmationModalState.productId);
    };

    return (
        <>
            <div
                className="relative flex flex-col"
                style={{
                    filter:
                        modalState.show || confirmationModalState.show
                            ? "blur(5px)"
                            : "none",
                }}
            >
                <TopBar />
                {isDesktop && <Sidebar />}
                <PageContentWrapper>
                    <DataTableProducts
                        onAddProduct={handleOpenModal}
                        onDeleteProduct={handleOpenConfirmationModal}
                    />
                </PageContentWrapper>
                <SidebarExtender />
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
            {confirmationModalState.show && (
                <>
                    <div
                        className="fixed inset-0 z-10 bg-black opacity-50"
                        onClick={handleCloseConfirmationModal}
                    ></div>
                    <DeleteConfirmationModal
                        onClose={handleCloseConfirmationModal}
                        onConfirm={handleDeleteConfirm}
                        entityName="produk"
                    />
                </>
            )}
        </>
    );
};

export default ProductsPage;
