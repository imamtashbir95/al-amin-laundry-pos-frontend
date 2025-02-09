import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";

const TestComponent = () => {
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
                            <ListItem disablePadding>
                                <ListItemButton
                                    href="#"
                                    sx={{
                                        gap: "0.5rem",
                                    }}
                                >
                                    <div className="w-[3rem]">
                                        <div className="absolute top-1/2 left-0 h-[80%] w-[0.25rem] -translate-y-1/2 bg-[#441fee]"></div>

                                        <ListItemAvatar
                                            className="flex items-center justify-center text-2xl"
                                            sx={{
                                                minWidth: "0px",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserShield}
                                                color="#441fee"
                                            />
                                        </ListItemAvatar>
                                    </div>
                                    <ListItemText
                                        primary="Karyawan"
                                        sx={{
                                            color: "#441fee",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    href="#"
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
                                                icon={faUserShield}
                                                color="#441fee"
                                            />
                                        </ListItemAvatar>
                                    </div>
                                    <ListItemText
                                        primary="Karyawan"
                                        sx={{
                                            color: "#441fee",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default TestComponent;
