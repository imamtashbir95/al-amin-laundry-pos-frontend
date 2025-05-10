import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const NotFoundPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <div className="relative h-screen w-screen bg-white">
                <div className="absolute top-1/2 left-1/2 z-20 flex h-[2.083rem] w-[75rem] -translate-x-1/2 -translate-y-[500%] items-center justify-center bg-gradient-to-r from-white from-10% via-indigo-500 via-50% to-white to-90%">
                    <div className="flex h-[200%] w-[5rem] items-center justify-center bg-white">
                        <Typography
                            sx={{
                                fontSize: "1.33rem",
                                fontWeight: "bold",
                                color: "var(--brand-1)",
                            }}
                        >
                            404
                        </Typography>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 flex h-[8.33rem] w-[75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[2rem]">
                    <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>{t("notFoundPage.title")}</Typography>
                    <Typography sx={{ fontSize: "1.5rem", color: "#4d4d4d" }}>
                        {t("notFoundPage.description")}
                    </Typography>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[250%]">
                    <Button
                        onClick={() => navigate(`/dashboard`)}
                        sx={{ width: "13.125rem", height: "3.125rem" }}
                        variant="contained"
                    >
                        {t("notFoundPage.button")}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
