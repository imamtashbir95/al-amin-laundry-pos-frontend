import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import relativeTime from "dayjs/plugin/relativeTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faPencil } from "@fortawesome/free-solid-svg-icons";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import i18n from "../i18n";
import { genders } from "../data/genders";
import { languages } from "../data/languages";
import { useSettings } from "../contexts/useSettings";
import { getCSSVariable } from "../utils/getCSSVariable";
import { createSettingsSchema } from "../zod/settingsSchema";
import default_profile_pic from "../assets/default-profile-pic.webp";
import "dayjs/locale/id";
import "dayjs/locale/en";
import TruncatedTooltipText from "./TruncatedTooltipText";

dayjs.extend(relativeTime);
i18n.language === "en" ? dayjs.locale("en") : dayjs.locale("id");

const Settings = ({ onChangePassword }) => {
    const { t } = useTranslation();
    const settingsSchema = useMemo(() => createSettingsSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            gender: "", // should be optional
            language: "", // should be optional
            phoneNumber: "", // should be optional
        },
        resolver: zodResolver(settingsSchema),
    });

    const { currentUser, updateCurrentUser } = useSettings();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (currentUser) {
            form.reset({
                name: currentUser?.name || "",
                email: currentUser?.email || "",
                username: currentUser?.username || "",
                gender: currentUser?.gender || "",
                language: currentUser?.language || "",
                phoneNumber: currentUser?.phoneNumber || "",
            });
        }
    }, [currentUser, form]);

    // Re-validate all fields when the language changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (Object.keys(form.formState.errors).length > 0) {
                form.trigger();
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(handler);
    }, [i18n.language]);

    const handleSettings = async () => {
        setIsEditing(false);
        const finalData = form.getValues();
        updateCurrentUser(finalData);
    };

    return (
        <>
            <section className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                        }}
                    >
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center bg-linear-to-r from-[var(--brand-1)] to-[var(--brand-2)] p-[2.083rem]"></div>
                        </div>
                        <form
                            // onSubmit={form.handleSubmit(handleSettings)}
                            className="flex flex-col gap-[1rem] p-[2.083rem]"
                        >
                            <div>
                                <CardContent className="flex gap-[2rem]">
                                    <div className="group relative flex">
                                        <div className="absolute inset-0 z-5 cursor-pointer rounded-full bg-linear-to-r from-[var(--brand-1)]/80 to-[var(--brand-2)]/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                                                <FontAwesomeIcon color="var(--background)" icon={faPencil} size="2xl" />
                                            </div>
                                        </div>
                                        <Avatar
                                            alt="profile"
                                            id="profile"
                                            src={default_profile_pic}
                                            sx={{
                                                width: "auto",
                                                height: "100px",
                                                cursor: "pointer",
                                            }}
                                        ></Avatar>
                                    </div>
                                    <div className="flex w-[50%] flex-col justify-center truncate">
                                        <TruncatedTooltipText text={currentUser?.name} variant="h6" gutterBottom />
                                        <TruncatedTooltipText text={currentUser?.email} variant="body1" gutterBottom />
                                    </div>
                                    <CardActions className="absolute right-[calc(2.583rem+2.083rem)] flex h-[6.25rem] w-[12rem] items-center justify-center">
                                        <Button
                                            className="!absolute right-3"
                                            disabled={isEditing && !form.formState.isDirty}
                                            loading={isEditing && form.formState.isSubmitting}
                                            onClick={() => {
                                                if (isEditing) {
                                                    form.handleSubmit(handleSettings)();
                                                } else {
                                                    setIsEditing(true);
                                                }
                                            }}
                                            size="small"
                                            variant="contained"
                                        >
                                            <div className="flex items-center gap-[0.5rem]">
                                                <FontAwesomeIcon icon={faPencil} />
                                                {isEditing ? t("settings.submitButton") : t("settings.editButton")}
                                            </div>
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <div className="flex w-[50%] flex-col gap-4">
                                            <Controller
                                                name="name"
                                                control={form.control}
                                                render={({ field, fieldState }) => {
                                                    return (
                                                        <>
                                                            <InputLabel id="text-name">
                                                                {t("settings.nameLabel")}
                                                            </InputLabel>
                                                            <TextField
                                                                {...field}
                                                                disabled={!isEditing}
                                                                placeholder={t("settings.namePlaceholder")}
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
                                                                {t("settings.usernameLabel")}
                                                            </InputLabel>
                                                            <TextField
                                                                {...field}
                                                                disabled={!isEditing}
                                                                placeholder={t("settings.usernamePlaceholder")}
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
                                                                {t("settings.languageLabel")}
                                                            </InputLabel>
                                                            <FormControl error={fieldState.invalid}>
                                                                <Select
                                                                    {...field}
                                                                    disabled={!isEditing}
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
                                                                    <MenuItem disabled={!isEditing} value="">
                                                                        {t("settings.languageEmptyItem")}
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
                                                                {t("settings.emailLabel")}
                                                            </InputLabel>
                                                            <TextField
                                                                {...field}
                                                                disabled={!isEditing}
                                                                placeholder={t("settings.emailPlaceholder")}
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
                                                                {t("settings.genderLabel")}
                                                            </InputLabel>
                                                            <FormControl error={fieldState.invalid}>
                                                                <Select
                                                                    {...field}
                                                                    disabled={!isEditing}
                                                                    displayEmpty
                                                                    id="select-gender"
                                                                    labelId="select-gender-label"
                                                                    onChange={(event) => {
                                                                        field.onChange(event.target.value);
                                                                    }}
                                                                    size="small"
                                                                    value={field.value || ""}
                                                                >
                                                                    <MenuItem disabled={!isEditing} value="">
                                                                        {t("settings.genderEmptyItem")}
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
                                                                {t("settings.phoneNumberLabel")}
                                                            </InputLabel>
                                                            <TextField
                                                                {...field}
                                                                disabled={!isEditing}
                                                                placeholder={t("settings.phoneNumberPlaceholder")}
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
                                </CardContent>
                            </div>
                            <div>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4">
                                        <Typography gutterBottom variant="h6">
                                            {t("settings.password")}
                                        </Typography>
                                        <div className="flex gap-4">
                                            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-[var(--brand-1)]">
                                                <FontAwesomeIcon
                                                    color={getCSSVariable("--background")}
                                                    icon={faKey}
                                                    size="xl"
                                                ></FontAwesomeIcon>
                                            </div>
                                            <div className="flex flex-col justify-center gap-1">
                                                <Typography variant="h6">•••••••••••••</Typography>
                                                <Typography gutterBottom>
                                                    {dayjs(currentUser?.passwordUpdatedAt)
                                                        .fromNow()
                                                        .replace(/^./, (c) => c.toUpperCase())}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div>
                                            <Button onClick={onChangePassword} size="small" variant="contained">
                                                <div className="flex items-center gap-[0.5rem]">
                                                    <FontAwesomeIcon icon={faPencil} />
                                                    {t("settings.changePasswordButton")}
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </form>
                    </Card>
                </div>
            </section>
        </>
    );
};

Settings.propTypes = {
    onChangePassword: PropTypes.func.isRequired,
};

export default Settings;
