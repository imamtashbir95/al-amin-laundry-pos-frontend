// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 14,
        body1: {
            fontSize: "0.875rem",
            fontWeight: 500,
        },
        h5: {
            fontSize: "1.5rem",
            fontWeight: 500,
        },
    },
    palette: {
        hanPurple: {
            main: "#441fee",
            light: "#775ef4",
            dark: "#2f12aa",
            contrastText: "#ffffff",
        },
        robinEggBlue: {
            main: "#13deb9",
            light: "#49e5d3",
            dark: "#0da78d",
            contrastText: "#ffffff",
        },
        gray: {
            main: "#8c8c8c",
            light: "#c7c7c7",
            dark: "#4d4d4d",
            contrastText: "#ffffff",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {},
                containedPrimary: {
                    backgroundColor: "#441fee",
                    "&:hover": {
                        backgroundColor: "#2f12aa",
                    },
                },
                containedSecondary: {
                    backgroundColor: "#8c8c8c",
                    "&:hover": {
                        backgroundColor: "#4d4d4d",
                    },
                },
                outlinedPrimary: {
                    borderColor: "#441fee",
                    color: "#441fee",
                    "&:hover": {
                        borderColor: "#2f12aa",
                        backgroundColor: "rgba(68, 31, 238, 0.1)",
                    },
                },
                textPrimary: {
                    color: "#441fee",
                    "&:hover": {
                        backgroundColor: "rgba(68, 31, 238, 0.1)",
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: "0.5rem",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: "#13deb9",
                    color: "#ffffff",
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#441fee",
                        "&:hover": {
                            backgroundColor: "#441fee",
                        },
                    },
                },
            },
        },
    },
});

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    // </StrictMode>,
);
