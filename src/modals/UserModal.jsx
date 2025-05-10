import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import i18n from "../i18n";
import { useUser } from "../contexts/useUser";
import { createUserSchema } from "../zod/userSchema";

const UserModal = ({ onClose, user }) => {
    const { t } = useTranslation();
    const userSchema = useMemo(() => createUserSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            role: "employee",
        },
        resolver: zodResolver(userSchema),
    });

    const { registerUser, updateUser } = useUser();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            form.reset({
                name: user?.name || "",
                email: user?.email || "",
                username: user?.username || "",
                password: "",
                confirmPassword: "",
                role: user?.role || "employee",
            });
        }
    }, [user, form]);

    // Re-validate all fields when the language changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (Object.keys(form.formState.errors).length > 0) {
                form.trigger();
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(handler);
    }, [i18n.language]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleUserSubmit = () => {
        const finalData = form.getValues();

        if (user && user.id) {
            const requestData = {
                id: user.id,
                name: finalData.name,
                email: finalData.email,
                username: finalData.username,
                password: finalData.password,
                confirmPassword: finalData.confirmPassword,
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
                    <CardContent>
                        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleUserSubmit)}>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-user">{t("userModal.nameLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("userModal.namePlaceholder")}
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                            <InputLabel id="text-email">{t("userModal.emailLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("userModal.emailPlaceholder")}
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                            <InputLabel id="text-username">{t("userModal.usernameLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("userModal.usernamePlaceholder")}
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                            <InputLabel id="text-password">{t("userModal.passwordLabel")}</InputLabel>
                                            <FormControl error={fieldState.invalid}>
                                                <OutlinedInput
                                                    {...field}
                                                    autoComplete="on"
                                                    id="outlined-adornment-password"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label={
                                                                    showPassword
                                                                        ? "hide the password"
                                                                        : "display the password"
                                                                }
                                                                edge="end"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                onMouseUp={handleMouseUpPassword}
                                                                size="small"
                                                            >
                                                                {showPassword ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    placeholder={t("userModal.passwordPlaceholder")}
                                                    size="small"
                                                    type={showPassword ? "text" : "password"}
                                                ></OutlinedInput>
                                                {fieldState.error && (
                                                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="confirmPassword"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-confirm-password">
                                                {t("userModal.passwordConfirmationLabel")}
                                            </InputLabel>
                                            <FormControl error={fieldState.invalid}>
                                                <OutlinedInput
                                                    {...field}
                                                    autoComplete="on"
                                                    id="outlined-adornment-confirm-password"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label={
                                                                    showPassword
                                                                        ? "hide the password"
                                                                        : "display the password"
                                                                }
                                                                edge="end"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                onMouseUp={handleMouseUpPassword}
                                                                size="small"
                                                            >
                                                                {showPassword ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    placeholder={t("userModal.passwordConfirmationPlaceholder")}
                                                    size="small"
                                                    type={showPassword ? "text" : "password"}
                                                ></OutlinedInput>
                                                {fieldState.error && (
                                                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </>
                                    );
                                }}
                            ></Controller>
                            <div className="flex justify-end gap-4">
                                <Button
                                    className="w-[6.25rem]"
                                    disabled={!form.formState.isDirty}
                                    loading={form.formState.isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                    {t("userModal.submitButton")}
                                </Button>
                                <Button className="w-[6.25rem]" onClick={onClose} variant="outlined">
                                    {t("userModal.closeButton")}
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
