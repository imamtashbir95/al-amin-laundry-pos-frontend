import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import {
    faBox,
    faChartSimple,
    faGears,
    faHome,
    faReceipt,
    faUsers,
    faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/useAuth";

const Sidebar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { user } = useAuth();

    const navItems = useMemo(() => {
        const items = [
            { path: "/dashboard", label: t("navItems.dashboard"), icon: faHome },
            { path: "/customers", label: t("navItems.customers"), icon: faUsers },
            { path: "/transactions", label: t("navItems.transactions"), icon: faReceipt },
            { path: "/report", label: t("navItems.report"), icon: faChartSimple },
            { path: "/settings", label: t("navItems.settings"), icon: faGears },
        ];

        if (user?.role === "admin") {
            const dashboardIndex = items.findIndex((item) => item.path === "/dashboard");
            if (dashboardIndex !== -1) {
                items.splice(
                    dashboardIndex + 1,
                    0,
                    {
                        path: "/users",
                        label: t("navItems.users"),
                        icon: faUserShield,
                    },
                    { path: "/products", label: t("navItems.products"), icon: faBox },
                );
            }
        }

        return items;
    }, [user?.role]);

    const activeColor = "var(--brand-1)";
    const defaultColor = "var(--text-secondary)";

    return (
        <>
            <nav
                className="fixed top-[4.167rem] z-5 flex w-[14.5rem] bg-white shadow-xl h-[calc(100vh-4.167rem)]"
            >
                <div className="flex w-full flex-col items-center px-[1.042rem] py-[2.5rem]">
                    <Box
                        sx={{
                            overflowX: "scroll",
                            width: "100%",
                            maxWidth: 360,
                        }}
                    >
                        <List>
                            {navItems.map(({ path, label, icon }) => {
                                const isActive = location.pathname.startsWith(path);
                                return (
                                    <ListItem disablePadding key={path}>
                                        {isActive && (
                                            <motion.div
                                                className="absolute top-1/2 left-0 h-[100%] w-[0.25rem] -translate-y-1/2 bg-[var(--brand-1)]"
                                                layoutId="activeSidebarIndicator"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 20,
                                                }}
                                            ></motion.div>
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
                                                        color={isActive ? activeColor : defaultColor}
                                                    />
                                                </ListItemAvatar>
                                            </div>
                                            <ListItemText
                                                primary={label}
                                                sx={{
                                                    color: isActive ? activeColor : defaultColor,
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </div>
                <Divider flexItem orientation="vertical" />
            </nav>
        </>
    );
};

export default Sidebar;
