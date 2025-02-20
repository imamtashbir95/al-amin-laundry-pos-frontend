import PropTypes from "prop-types";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";

const DeleteConfirmationModal = ({
    onClose,
    onConfirm,
    entityName = "data",
}) => {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <Card
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(12px)",
                        width: "31.25rem",
                        "@media (max-width: 36rem)": {
                            width: "calc(100vw - 2rem)",
                        },
                    }}
                >
                    <CardContent className="flex flex-col gap-1">
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontWeight: "light",
                                m: 1,
                            }}
                        >
                            Konfirmasi
                        </Typography>
                        <Divider></Divider>
                        <Typography sx={{ mt: 1, mr: 1, ml: 1, mb: 5 }}>
                            Apakah Anda yakin ingin menghapus {entityName} ini?
                        </Typography>
                        <div className="flex justify-end gap-4">
                            <Button
                                variant="contained"
                                className="w-[6.25rem]"
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                Hapus
                            </Button>
                            <Button
                                variant="outlined"
                                className="w-[6.25rem]"
                                onClick={onClose}
                            >
                                Batal
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
