import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/useAuth";
import logo_black from "../assets/logo.png";
import default_profile_pic from "../assets/default-profile-pic.webp";
import { useTranslation } from "react-i18next";

const TopBar = () => {
    const { t } = useTranslation();
    const { signOut } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 1024 });
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMyAccount = () => {
        navigate("/settings");
        handleClose();
    };

    const handleSignOut = () => {
        signOut();
        handleClose();
    };

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    useEffect(() => {
        if (!isMobile) {
            setShowSidebar(false);
        }
    }, [isMobile]);

    useEffect(() => {
        document.body.style.overflow = showSidebar ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showSidebar]);

    return (
        <>
            <header className="fixed top-0 z-10 flex w-full max-w-[1920px] flex-col bg-white">
                <div className="relative flex h-[4.167rem] flex-row items-center justify-end gap-[1rem] px-[2.083rem] shadow-xl">
                    <div className="absolute top-[0.83rem] left-[2.083rem] lg:hidden">
                        <Avatar
                            alt="sidebar_button"
                            id="profile"
                            onClick={toggleSidebar}
                            sx={{ backgroundColor: "var(--brand-1)", cursor: "pointer" }}
                        >
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </Avatar>
                    </div>
                    <div className="absolute top-[0.83rem] left-[2.083rem] z-20 flex max-lg:left-1/2 max-lg:-translate-x-1/2">
                        <a href="/">
                            <img className="pointer-events-none h-[2.5rem]" alt="logo" src={logo_black} />
                        </a>
                    </div>
                    <Avatar
                        alt="profile"
                        id="profile"
                        onClick={handleClick}
                        src={default_profile_pic}
                        sx={{ cursor: "pointer" }}
                    ></Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        id="basic-menu"
                        MenuListProps={{
                            "aria-labelledby": "profile",
                        }}
                        onClose={handleClose}
                        open={open}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleMyAccount}>{t("topBar.myAccount")}</MenuItem>
                        <MenuItem onClick={handleSignOut}>{t("topBar.signOut")}</MenuItem>
                    </Menu>
                </div>
                <Divider flexItem />
            </header>

            {isMobile && (
                <>
                    <div
                        className={`fixed top-0 left-0 z-25 h-full w-[14.5rem] bg-white shadow-xl transition-transform duration-300 ${
                            showSidebar ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <div className="absolute top-[0.83rem] left-[2.083rem]">
                            <Avatar
                                alt="sidebar_button"
                                id="profile"
                                onClick={toggleSidebar}
                                sx={{ backgroundColor: "var(--brand-1)", cursor: "pointer" }}
                            >
                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                            </Avatar>
                        </div>
                        <Sidebar />
                    </div>
                    {showSidebar && <div className="fixed inset-0 z-20 bg-black opacity-50" onClick={toggleSidebar} />}
                </>
            )}
        </>
    );
};

export default TopBar;
