import { lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence } from "motion/react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { useUser } from "../contexts/useUser";
import DataTableUsers from "../components/DataTableUsers";
import PageContentWrapper from "../components/PageContentWrapper";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";

const UserModal = lazy(() => import("../modals/UserModal"));
const DeleteConfirmationModal = lazy(() => import("../modals/DeleteConfirmationModal"));

const UsersPage = () => {
    const { t } = useTranslation();
    const { deleteUser } = useUser();

    const [modalState, setModalState] = useState({
        show: false,
        user: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        userId: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const isModalOpen = modalState.show || confirmationModalState.show;
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalState.show, confirmationModalState.show]);
    const handleOpenModal = (user = null) => setModalState({ show: true, user });
    const handleCloseModal = () => setModalState({ show: false, user: null });

    const handleOpenConfirmationModal = (userId = null) => setConfirmationModalState({ show: true, userId });

    const handleCloseConfirmationModal = () => setConfirmationModalState({ show: false, userId: null });

    const handleDeleteConfirm = () => {
        deleteUser(confirmationModalState.userId);
    };

    return (
        <>
            <div className="relative flex w-screen max-w-[1920px] flex-col bg-[#fafafa]">
                <TopBar />
                {isDesktop && <Sidebar />}
                <PageContentWrapper>
                    <DataTableUsers onRegisterUser={handleOpenModal} onDeleteUser={handleOpenConfirmationModal} />
                </PageContentWrapper>
                <FootBar />
            </div>
            <AnimatePresence>
                {modalState.show && (
                    <>
                        <div className="fixed inset-0 z-10 bg-black opacity-50" onClick={handleCloseModal}></div>
                        <ModalAnimationWrapper>
                            <UserModal onClose={handleCloseModal} user={modalState.user} />
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
                                entityName={t("entities.user")}
                            />
                        </ModalAnimationWrapper>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default UsersPage;
