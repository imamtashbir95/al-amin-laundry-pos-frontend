import { z } from "zod";

export const createBaseUserSchema = (t) => z.object({
    name: z.string().min(3, t("validation.name.min")).max(100, t("validation.name.max")),
    email: z
        .string()
        .email(t("validation.email.invalid"))
        .min(5, t("validation.email.min"))
        .max(50, t("validation.email.max")),
    username: z
        .string()
        .min(3, t("validation.username.min"))
        .max(25, t("validation.username.max"))
        .regex(/^[a-zA-Z0-9_]+$/, t("validation.username.invalid")),
});