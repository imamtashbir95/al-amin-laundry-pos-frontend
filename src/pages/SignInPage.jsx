import { useEffect, useMemo, useState } from "react";
import { waveform } from "ldrs";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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
    Typography,
} from "@mui/material";
import i18n from "../i18n";
import { useAuth } from "../contexts/useAuth";
import logo_black from "../assets/logo.png";
import { createSignInSchema } from "../zod/signInSchema";
import background from "../assets/background.jpg";

const SignInPage = () => {
    const { t } = useTranslation();
    const [timeoutError, setTimeoutError] = useState(false);
    waveform.register();
    const signInSchema = useMemo(() => createSignInSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(signInSchema),
    });

    const { user, token, signIn } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSignIn = async () => {
        setIsLoading(true);
        setTimeoutError(false);
        const signInData = form.getValues();
        const result = await signIn(signInData);
        setIsLoading(false);
        if (result.success) {
            navigate("/dashboard");
        } else if (result.timeout) {
            setTimeoutError(true);
        }
    };

    useEffect(() => {
        if (token && user !== null) {
            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        }
    }, [user, token, navigate]);

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSignIn)}>
                <div
                    className={`flex min-h-screen w-screen items-center justify-center bg-[url('${background}')] bg-cover bg-center`}
                    style={{
                        backgroundImage: `url(${background})`,
                    }}
                >
                    <Card
                        sx={{
                            backdropFilter: "blur(12px)",
                            width: "31.25rem",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            "@media (max-width: 36rem)": {
                                width: "calc(100vw - 2rem)",
                            },
                        }}
                    >
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <img className="h-[2.5rem]" alt="Logo" loading="lazy" src={logo_black} />
                            </div>
                            {timeoutError && (
                                <div className="rounded-[0.5rem] border border-[#ff0000] bg-[#ff6666]/[.2] p-[0.875rem]">
                                    <Typography color="#ff0000">{t("signInForm.timeoutError")}</Typography>
                                </div>
                            )}
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-username">{t("signInForm.usernameLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("signInForm.usernamePlaceholder")}
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
                                            <InputLabel id="text-password">{t("signInForm.passwordLabel")}</InputLabel>
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
                                                    placeholder={t("signInForm.passwordPlaceholder")}
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
                                <Button disabled={isLoading} sx={{ width: "100%" }} type="submit" variant="contained">
                                    {isLoading ? (
                                        <l-waveform color="white" size="27" speed="1" stroke="3.5"></l-waveform>
                                    ) : (
                                        t("signInForm.signInButton")
                                    )}
                                </Button>
                            </div>
                            <div className="flex items-center justify-center">
                                <span>{t("signInForm.switch")}</span>
                                <span>&nbsp;</span>
                                <Link to="/" className="text-blue-600 underline">
                                    {t("signInForm.switchLink")}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </>
    );
};

export default SignInPage;
