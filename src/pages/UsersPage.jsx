import { lazy, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { UserContext } from "../contexts/UserContext";
import DataTableUsers from "../components/DataTableUsers";
import SidebarExtender from "../components/SidebarExtender";
import PageContentWrapper from "../components/PageContentWrapper";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";
import { AnimatePresence } from "motion/react";

const UserModal = lazy(() => import("../modals/UserModal"));
const DeleteConfirmationModal = lazy(
    () => import("../modals/DeleteConfirmationModal"),
);

const UsersPage = () => {
    const { deleteUser } = useContext(UserContext);

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
    const handleOpenModal = (user = null) =>
        setModalState({ show: true, user });
    const handleCloseModal = () => setModalState({ show: false, user: null });

    const handleOpenConfirmationModal = (userId = null) =>
        setConfirmationModalState({ show: true, userId });

    const handleCloseConfirmationModal = () =>
        setConfirmationModalState({ show: false, userId: null });

    const handleDeleteConfirm = () => {
        deleteUser(confirmationModalState.userId);
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
                    <DataTableUsers
                        onRegisterUser={handleOpenModal}
                        onDeleteUser={handleOpenConfirmationModal}
                    />
                </PageContentWrapper>
                <SidebarExtender></SidebarExtender>
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
                            <UserModal
                                onClose={handleCloseModal}
                                user={modalState.user}
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
                                entityName="karyawan"
                            />
                        </ModalAnimationWrapper>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default UsersPage;
