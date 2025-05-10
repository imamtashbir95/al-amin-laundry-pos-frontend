// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import App from "./App";
import { getCSSVariable } from "./utils/getCSSVariable";
import "./i18n";
import "./index.css";

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
            fontWeight: getCSSVariable("--font-weight-medium"),
            lineHeight: getCSSVariable("--line-height"),
        },
        h6: {
            fontSize: "1.25rem",
            fontWeight: getCSSVariable("--font-weight-medium"),
            lineHeight: getCSSVariable("--line-height"),
        },
        h5: {
            fontSize: "1.5rem",
            fontWeight: getCSSVariable("--font-weight-medium"),
            lineHeight: getCSSVariable("--line-height"),
        },
        h4: {
            fontSize: "2.125rem",
            fontWeight: getCSSVariable("--font-weight-medium"),
            lineHeight: getCSSVariable("--line-height"),
        },
        h3: {
            fontSize: "3rem",
            fontWeight: getCSSVariable("--font-weight-medium"),
            lineHeight: getCSSVariable("--line-height"),
        },
        h2: {
            fontSize: "4rem",
            fontWeight: getCSSVariable("--font-weight-medium"),
            lineHeight: getCSSVariable("--line-height"),
        },
        h1: {
            fontSize: "6rem",
            fontWeight: getCSSVariable("--font-weight-medium"),
            lineHeight: getCSSVariable("--line-height"),
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
                    backgroundColor: getCSSVariable("--brand-1"),
                    "&:hover": {
                        backgroundColor: getCSSVariable("--brand-1-dark"),
                    },
                },
                outlinedPrimary: {
                    borderColor: getCSSVariable("--brand-1"),
                    color: getCSSVariable("--brand-1"),
                    "&:hover": {
                        borderColor: getCSSVariable("--brand-1-dark"),
                        backgroundColor: getCSSVariable("--brand-1-opaque"),
                    },
                },
                textPrimary: {
                    color: getCSSVariable("--brand-1"),
                    "&:hover": {
                        backgroundColor: getCSSVariable("--brand-1-opaque"),
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: getCSSVariable("--brand-2"),
                    color: getCSSVariable("--background"),
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    width: "40px",
                    height: "40px",
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
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: getCSSVariable("--brand-1"),
                        "&:hover": {
                            backgroundColor: getCSSVariable("--brand-1"),
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
