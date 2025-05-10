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
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import i18n from "../i18n";
import { genders } from "../data/genders";
import { useAuth } from "../contexts/useAuth";
import { languages } from "../data/languages";
import logo_black from "../assets/logo.png";
import { createSignUpSchema } from "../zod/signUpSchema";
import background from "../assets/background.jpg";

const SignUpPage = () => {
    const { t } = useTranslation();
    waveform.register();
    const signUpSchema = useMemo(() => createSignUpSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            gender: "", // should be optional
            language: "", // should be optional
            phoneNumber: "", // should be optional
            password: "",
            confirmPassword: "",
            role: "employee",
        },
        resolver: zodResolver(signUpSchema),
    });

    const { user, token, signUp } = useAuth();
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

    const handleSignUp = async () => {
        setIsLoading(true);
        const signUpData = form.getValues();
        const success = await signUp(signUpData);
        setIsLoading(false);
        if (success) {
            navigate("/signin");
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
            <form onSubmit={form.handleSubmit(handleSignUp)}>
                <div
                    className={`flex min-h-screen w-screen items-center justify-center bg-[url("${background}")] bg-cover bg-center py-[4rem]`}
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
                            <div className="flex h-full w-full flex-col gap-4 max-lg:overflow-x-scroll">
                                <div className="flex gap-4 max-lg:w-[31.25rem]">
                                    <div className="flex w-[50%] flex-col gap-4">
                                        <Controller
                                            name="name"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="text-name">
                                                            {t("signUpForm.nameLabel")}
                                                        </InputLabel>
                                                        <TextField
                                                            {...field}
                                                            placeholder={t("signUpForm.namePlaceholder")}
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
                                                        <InputLabel id="text-username">
                                                            {t("signUpForm.usernameLabel")}
                                                        </InputLabel>
                                                        <TextField
                                                            {...field}
                                                            placeholder={t("signUpForm.usernamePlaceholder")}
                                                            size="small"
                                                            error={fieldState.invalid}
                                                            helperText={fieldState.error?.message}
                                                        />
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                        <Controller
                                            name="language"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="select-language-label">
                                                            {t("signUpForm.languageLabel")}
                                                        </InputLabel>
                                                        <FormControl error={fieldState.invalid}>
                                                            <Select
                                                                {...field}
                                                                displayEmpty
                                                                id="select-language"
                                                                labelId="select-language-label"
                                                                onChange={(event) => {
                                                                    field.onChange(event.target.value);
                                                                    i18n.changeLanguage(event.target.value);
                                                                }}
                                                                size="small"
                                                                value={field.value || ""}
                                                            >
                                                                <MenuItem disabled value="">
                                                                    {t("signUpForm.languageEmptyItem")}
                                                                </MenuItem>
                                                                {languages.map((language, index) => (
                                                                    <MenuItem value={language.value} key={index}>
                                                                        {t(language.label)}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            {fieldState.error && (
                                                                <FormHelperText>
                                                                    {fieldState.error.message}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                    </div>
                                    <div className="flex w-[50%] flex-col gap-4">
                                        <Controller
                                            name="email"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="text-email">
                                                            {t("signUpForm.emailLabel")}
                                                        </InputLabel>
                                                        <TextField
                                                            {...field}
                                                            placeholder={t("signUpForm.emailPlaceholder")}
                                                            size="small"
                                                            error={fieldState.invalid}
                                                            helperText={fieldState.error?.message}
                                                        />
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                        <Controller
                                            name="gender"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="select-gender-label">
                                                            {t("signUpForm.genderLabel")}
                                                        </InputLabel>
                                                        <FormControl error={fieldState.invalid}>
                                                            <Select
                                                                {...field}
                                                                displayEmpty
                                                                id="select-gender"
                                                                labelId="select-gender-label"
                                                                onChange={(event) => {
                                                                    field.onChange(event.target.value);
                                                                }}
                                                                size="small"
                                                                value={field.value || ""}
                                                            >
                                                                <MenuItem disabled value="">
                                                                    {t("signUpForm.genderEmptyItem")}
                                                                </MenuItem>
                                                                {genders.map((gender, index) => (
                                                                    <MenuItem value={gender.value} key={index}>
                                                                        {t(gender.label)}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            {fieldState.error && (
                                                                <FormHelperText>
                                                                    {fieldState.error.message}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                        <Controller
                                            name="phoneNumber"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="text-name">
                                                            {t("signUpForm.phoneNumberLabel")}
                                                        </InputLabel>
                                                        <TextField
                                                            {...field}
                                                            placeholder={t("signUpForm.phoneNumberPlaceholder")}
                                                            size="small"
                                                            error={fieldState.invalid}
                                                            helperText={fieldState.error?.message}
                                                        />
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 max-lg:w-[31.25rem]">
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <InputLabel id="text-password">
                                                        {t("signUpForm.passwordLabel")}
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
                                                            placeholder={t("signUpForm.passwordPlaceholder")}
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
                                                        {t("signUpForm.passwordConfirmationLabel")}
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
                                                                "signUpForm.passwordConfirmationPlaceholder",
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
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <Button sx={{ width: "100%" }} type="submit" variant="contained">
                                    {isLoading ? (
                                        <l-waveform size="27" stroke="3.5" speed="1" color="white"></l-waveform>
                                    ) : (
                                        t("signUpForm.signUpButton")
                                    )}
                                </Button>
                            </div>
                            <div className="flex items-center justify-center">
                                <span>{t("signUpForm.switch")}</span>
                                <span>&nbsp;</span>
                                <Link to="/signin" className="text-blue-600 underline">
                                    {t("signUpForm.switchLink")}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </>
    );
};

export default SignUpPage;
