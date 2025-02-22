import { useEffect } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Card,
    CardContent,
    InputLabel,
    TextField,
} from "@mui/material";
import { signUpSchema } from "../zod/signUpSchema";
import { useUser } from "../contexts/useUser";

const UserModal = ({ onClose, user }) => {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            role: "employee",
        },
        resolver: zodResolver(signUpSchema),
    });

    const { registerUser, updateUser } = useUser();

    useEffect(() => {
        if (user) {
            form.reset({
                name: user?.name || "",
                email: user?.email || "",
                username: user?.username || "",
                password: "",
                role: user?.role || "employee",
            });
        }
    }, [user, form]);

    const handleUserSubmit = () => {
        const finalData = form.getValues();

        if (user && user.id) {
            const requestData = {
                id: user.id,
                name: finalData.name,
                email: finalData.email,
                username: finalData.username,
                password: finalData.password,
                role: finalData.role,
            };
            updateUser(requestData);
        } else {
            registerUser(finalData);
        }
        onClose();
    };

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
                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(handleUserSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-user">
                                                Nama Karyawan
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Nama Karyawan"
                                                error={fieldState.invalid}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-email">
                                                E-mail
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="E-mail"
                                                error={fieldState.invalid}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-username">
                                                Username
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Username"
                                                error={fieldState.invalid}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-password">
                                                Kata Sandi
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Kata Sandi"
                                                type="password"
                                                error={fieldState.invalid}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="contained"
                                    className="w-[6.25rem]"
                                    type="submit"
                                >
                                    Simpan
                                </Button>
                                <Button
                                    variant="outlined"
                                    className="w-[6.25rem]"
                                    onClick={onClose}
                                >
                                    Tutup
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default UserModal;

UserModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object,
};
