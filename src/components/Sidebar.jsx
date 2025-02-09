import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import {
    faBox,
    faReceipt,
    faShop,
    faUsers,
    faUserShield,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const navItems = [
        { path: "/products", label: "Manajemen Produk", icon: faBox },
        { path: "/customers", label: "Pelanggan", icon: faUsers },
        { path: "/transactions", label: "Transaksi", icon: faReceipt },
        { path: "/pengeluaran", label: "Pengeluaran", icon: faWallet },
    ];

    if (user?.role === "admin") {
        navItems.unshift(
            {
                path: "/users",
                label: "Karyawan",
                icon: faUserShield,
            },
            { path: "/outlets", label: "Cabang", icon: faShop },
        );
    }

    const activeColor = "#441fee";
    const defaultColor = "#4d4d4d";

    return (
        <>
            <div
                className="sticky top-[4.167rem] z-5 flex w-[17.5rem] shadow-xl"
                style={{ height: "calc(100vh - 4.167rem)" }}
            >
                <div className="flex flex-col items-center bg-white py-[2.5rem] pr-[2.083rem] pl-[1.04167rem]">
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "",
                        }}
                    >
                        <List>
                            {navItems.map(({ path, label, icon }) => {
                                const isActive =
                                    location.pathname.startsWith(path);
                                return (
                                    <ListItem disablePadding key={path}>
                                        {isActive && (
                                            <div className="absolute top-1/2 left-0 h-[80%] w-[0.25rem] -translate-y-1/2 bg-[#441fee]"></div>
                                        )}
                                        <ListItemButton
                                            href={path}
                                            sx={{
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <div className="w-[3rem]">
                                                <ListItemAvatar
                                                    className="flex items-center justify-center text-2xl"
                                                    sx={{
                                                        minWidth: "0px",
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={icon}
                                                        color={
                                                            isActive
                                                                ? activeColor
                                                                : defaultColor
                                                        }
                                                    />
                                                </ListItemAvatar>
                                            </div>
                                            <ListItemText
                                                primary={label}
                                                sx={{
                                                    color: isActive
                                                        ? activeColor
                                                        : defaultColor,
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
