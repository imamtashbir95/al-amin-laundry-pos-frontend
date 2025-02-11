import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

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
    },
    palette: {
        hanPurple: {
            main: "#441fee",
            light: "#775ef4",
            dark: "#2f12aa",
            contrastText: "#ffffff",
        },
        gray: {
            main: "#8c8c8c",
            light: "#c7c7c7",
            dark: "#4d4d4d",
            contrastText: "#ffffff",
        },
    },
});

createRoot(document.getElementById("root")).render(
    // <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    // </StrictMode>,
);
