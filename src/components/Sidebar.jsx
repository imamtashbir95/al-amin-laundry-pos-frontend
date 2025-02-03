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
// import logo_black from "../assets/logo_el.png";

const Sidebar = () => {
    return (
        <>
            <div className="sticky top-[4.167rem] z-5">
                <div
                    className="flex w-auto bg-white"
                    style={{ height: "calc(100vh - 4.167rem)" }}
                >
                    <div className="flex w-[18.75rem] flex-col items-center gap-[1rem] px-[2.083rem] py-[3.125rem] shadow-xl">
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "",
                            }}
                        >
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        href="/products"
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
                                                <FontAwesomeIcon icon={faBox} />
                                            </ListItemAvatar>
                                        </div>
                                        <ListItemText primary="Manajemen Produk" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component="a"
                                        href="/customers"
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
                                                    icon={faUsers}
                                                />
                                            </ListItemAvatar>
                                        </div>
                                        <ListItemText primary="Pelanggan" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component="a"
                                        href="/transactions"
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
                                                    icon={faReceipt}
                                                />
                                            </ListItemAvatar>
                                        </div>
                                        <ListItemText primary="Transaksi" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </div>
                    <Divider orientation="vertical" flexItem />
                </div>
            </div>
        </>
    );
};

export default Sidebar;