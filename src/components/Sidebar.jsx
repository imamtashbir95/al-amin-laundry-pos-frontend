import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import {
    faBox,
    faChartSimple,
    faHome,
    faReceipt,
    faUsers,
    faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/useAuth";
import { useMemo } from "react";

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const navItems = useMemo(() => {
        const items = [
            { path: "/dashboard", label: "Dasbor", icon: faHome },
            { path: "/customers", label: "Pelanggan", icon: faUsers },
            { path: "/transactions", label: "Transaksi", icon: faReceipt },
            { path: "/report", label: "Laporan", icon: faChartSimple },
        ];

        if (user?.role === "admin") {
            const dashboardIndex = items.findIndex(
                (item) => item.path === "/dashboard",
            );
            if (dashboardIndex !== -1) {
                items.splice(
                    dashboardIndex + 1,
                    0,
                    {
                        path: "/users",
                        label: "Karyawan",
                        icon: faUserShield,
                    },
                    { path: "/products", label: "Produk", icon: faBox },
                );
            }
        }

        return items;
    }, [user?.role]);

    const activeColor = "#441fee";
    const defaultColor = "#4d4d4d";

    return (
        <>
            <div
                className="fixed top-[4.167rem] z-5 flex w-[14.5rem] bg-white shadow-xl"
                style={{
                    height: "calc(100vh - 4.167rem)",
                }}
            >
                <div className="flex w-full flex-col items-center py-[2.5rem] pr-[1.04167rem] pl-[1.04167rem]">
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
                                            component={Link}
                                            to={path}
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
                <Divider orientation="vertical" flexItem />
            </div>
        </>
    );
};

export default Sidebar;
