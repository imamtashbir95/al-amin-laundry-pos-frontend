import { lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence } from "motion/react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { useProduct } from "../contexts/useProduct";
import DataTableProducts from "../components/DataTableProducts";
import PageContentWrapper from "../components/PageContentWrapper";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";

const ProductModal = lazy(() => import("../modals/ProductModal"));
const DeleteConfirmationModal = lazy(() => import("../modals/DeleteConfirmationModal"));

const ProductsPage = () => {
    const { t } = useTranslation();
    const { deleteProduct } = useProduct();

    const [modalState, setModalState] = useState({
        show: false,
        product: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        productId: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const isModalOpen = modalState.show || confirmationModalState.show;
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalState.show, confirmationModalState.show]);

    const handleOpenModal = (product = null) => setModalState({ show: true, product });
    const handleCloseModal = () => setModalState({ show: false, product: null });

    const handleOpenConfirmationModal = (productId = null) => setConfirmationModalState({ show: true, productId });

    const handleCloseConfirmationModal = () => setConfirmationModalState({ show: false, productId: null });

    const handleDeleteConfirm = () => {
        deleteProduct(confirmationModalState.productId);
    };

    return (
        <>
            <div className="relative flex w-screen max-w-[1920px] flex-col bg-[#fafafa]">
                <TopBar />
                {isDesktop && <Sidebar />}
                <PageContentWrapper>
                    <DataTableProducts onAddProduct={handleOpenModal} onDeleteProduct={handleOpenConfirmationModal} />
                </PageContentWrapper>
                <FootBar />
            </div>
            <AnimatePresence>
                {modalState.show && (
                    <>
                        <div className="fixed inset-0 z-10 bg-black opacity-50" onClick={handleCloseModal}></div>
                        <ModalAnimationWrapper>
                            <ProductModal onClose={handleCloseModal} product={modalState.product} />
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
                                entityName={t("entities.product")}
                            />
                        </ModalAnimationWrapper>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductsPage;
