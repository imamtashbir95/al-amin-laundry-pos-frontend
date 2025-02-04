import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faReceipt, faUsers } from "@fortawesome/free-solid-svg-icons";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { path: "/products", label: "Manajemen Produk", icon: faBox },
        { path: "/customers", label: "Pelanggan", icon: faUsers },
        { path: "/transactions", label: "Transaksi", icon: faReceipt },
    ];

    const activeColor = "#441fee";
    const defaultColor = "#4d4d4d";

    return (
        <>
            <div
                className="sticky top-[4.167rem] z-5 flex w-[17.5rem] bg-white"
                style={{ height: "calc(100vh - 4.167rem)" }}
            >
                <div className="flex flex-col items-center py-[2.5rem] pr-[2.083rem] pl-[1.04167rem] shadow-xl">
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
                <Divider orientation="vertical" flexItem />
            </div>
        </>
    );
};

export default Sidebar;
