import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import logo_black from "../assets/logo-el.png";
import { useAuth } from "../contexts/useAuth";
import default_profile_pic from "../assets/default-profile-pic.webp";

const TopBar = () => {
    const { signOut } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 1024 });
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
            <header className="fixed top-0 z-10 flex w-full flex-col bg-white">
                <div className="relative flex h-[4.167rem] flex-row items-center justify-end gap-[1rem] px-[2.083rem] shadow-xl">
                    <div className="absolute top-[0.83rem] left-[2.083rem] lg:hidden">
                        <Avatar
                            id="profile"
                            alt="sidebar_button"
                            sx={{ bgcolor: "var(--brand-1)", cursor: "pointer" }}
                            onClick={toggleSidebar}
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
                        id="profile"
                        alt="profile"
                        src={default_profile_pic}
                        className=""
                        onClick={handleClick}
                        sx={{ cursor: "pointer" }}
                    ></Avatar>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "profile",
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profil</MenuItem>
                        <MenuItem onClick={handleClose}>Akun saya</MenuItem>
                        <MenuItem onClick={handleSignOut}>Keluar</MenuItem>
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
                                id="profile"
                                alt="sidebar_button"
                                sx={{ bgcolor: "var(--brand-1)", cursor: "pointer" }}
                                onClick={toggleSidebar}
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
