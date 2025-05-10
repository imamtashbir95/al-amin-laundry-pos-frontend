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
} from "@mui/material";
import i18n from "../i18n";
import { useSettings } from "../contexts/useSettings";
import { createPasswordSettingsSchema } from "../zod/passwordSettingsSchema";

const ChangePasswordModal = ({ onClose }) => {
    const { t } = useTranslation();
    const passwordSettingsSchema = useMemo(() => createPasswordSettingsSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(passwordSettingsSchema),
    });

    const { updateCurrentUserPassword } = useSettings();
    const [showPassword, setShowPassword] = useState(false);

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

    const handleChangePassword = () => {
        const finalData = form.getValues();
        updateCurrentUserPassword(finalData);
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
                        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleChangePassword)}>
                            <Controller
                                name="oldPassword"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-old-password">
                                                {t("changePasswordModal.oldPasswordLabel")}
                                            </InputLabel>
                                            <FormControl error={fieldState.invalid}>
                                                <OutlinedInput
                                                    {...field}
                                                    autoComplete="on"
                                                    id="outlined-adornment-old-password"
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
                                                    placeholder={t("changePasswordModal.oldPasswordPlaceholder")}
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
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-password">
                                                {t("changePasswordModal.passwordLabel")}
                                            </InputLabel>
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
                                                    placeholder={t("changePasswordModal.passwordPlaceholder")}
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
                                                {t("changePasswordModal.passwordConfirmationLabel")}
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
                                                    placeholder={t(
                                                        "changePasswordModal.passwordConfirmationPlaceholder",
                                                    )}
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
                                    variant="contained"
                                    disabled={!form.formState.isDirty}
                                    loading={form.formState.isSubmitting}
                                    className="w-[6.25rem]"
                                    type="submit"
                                >
                                    {t("changePasswordModal.submitButton")}
                                </Button>
                                <Button variant="outlined" className="w-[6.25rem]" onClick={onClose}>
                                    {t("changePasswordModal.closeButton")}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

ChangePasswordModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
