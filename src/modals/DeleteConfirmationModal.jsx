import PropTypes from "prop-types";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const DeleteConfirmationModal = ({ onClose, onConfirm, entityName = "data" }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <Card
                    sx={{
                        backdropFilter: "blur(12px)",
                        overflowY: "scroll",
                        width: "31.25rem",
                        maxHeight: "calc(100vh - 4rem)",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        "@media (max-width: 36rem)": {
                            width: "calc(100vw - 2rem)",
                        },
                    }}
                >
                    <CardContent className="flex flex-col gap-1">
                        <Typography
                            gutterBottom
                            sx={{
                                fontWeight: "light",
                                m: 1,
                            }}
                            variant="h5"
                        >
                            {t("deleteConfirmationModal.title")}
                        </Typography>
                        <Divider></Divider>
                        <Typography sx={{ mt: 1, mr: 1, ml: 1, mb: 5 }}>
                            {t("deleteConfirmationModal.message1")} {entityName}
                            {t("deleteConfirmationModal.message2")}
                        </Typography>
                        <div className="flex justify-end gap-4">
                            <Button
                                className="w-[6.25rem]"
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                variant="contained"
                            >
                                {t("deleteConfirmationModal.deleteButton")}
                            </Button>
                            <Button className="w-[6.25rem]" onClick={onClose} variant="outlined">
                                {t("deleteConfirmationModal.cancelButton")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default DeleteConfirmationModal;

DeleteConfirmationModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    entityName: PropTypes.string,
};
