import { z } from "zod";

export const createPasswordSchema = (t) => z.object({
    password: z
        .string()
        .min(8, t("validation.password.min"))
        .max(255, t("validation.password.max"))
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).*$/,
            t("validation.password.requirements"),
        ),
    confirmPassword: z
        .string()
        .min(1, t("validation.passwordConfirmation.required"))
});