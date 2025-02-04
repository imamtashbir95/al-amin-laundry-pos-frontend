import { useState } from "react";
import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import logo_black from "../assets/logo_el.png";
import { useAuth } from "../contexts/AuthContext";
import default_profile_pic from "../assets/default_profile_pic.png";

const TopBar = () => {
    const { signOut } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
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

    return (
        <>
            <div className="sticky top-0 z-15 flex flex-col bg-white">
                <div className="relative flex h-[4.167rem] flex-row items-center justify-end px-[2.083rem] shadow-xl">
                    <div className="absolute top-[0.83rem] left-[2.083rem]">
                        <img className="h-[2.5rem]" src={logo_black} />
                    </div>
                    <Avatar
                        id="profile"
                        alt="Remy Sharp"
                        src={default_profile_pic}
                        className=""
                        onClick={handleClick}
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
            </div>
        </>
    );
};

export default TopBar;
