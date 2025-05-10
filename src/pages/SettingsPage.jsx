import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import Settings from "../components/Settings";
import PageContentWrapper from "../components/PageContentWrapper";
import { lazy, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import ModalAnimationWrapper from "../components/ModalAnimationWrapper";

const ChangePasswordModal = lazy(() => import("../modals/ChangePasswordModal"));

const SettingsPage = () => {
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
        <>
            <div className="relative flex w-screen max-w-[1920px] flex-col bg-[#fafafa]">
                <TopBar />
                {isDesktop && <Sidebar />}
                <PageContentWrapper>
                    <Settings onChangePassword={handleOpenModal} />
                </PageContentWrapper>
                <AnimatePresence>
                    {showModal && (
                        <>
                            <div className="fixed inset-0 z-20 bg-black opacity-50" onClick={handleCloseModal}></div>
                            <ModalAnimationWrapper>
                                <ChangePasswordModal onClose={handleCloseModal} />
                            </ModalAnimationWrapper>
                        </>
                    )}
                </AnimatePresence>
                <FootBar />
            </div>
        </>
    );
};

export default SettingsPage;
