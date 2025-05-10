import { z } from "zod";
import { createPasswordSchema } from "./passwordSchema";

export const createPasswordSettingsSchema = (t) => {
    return createPasswordSchema(t)
        .extend({
            oldPassword: z.string().min(1, t("validation.oldPassword.required")),
        })
        .superRefine(({ password, confirmPassword, oldPassword }, ctx) => {
            if (password !== confirmPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: t("validation.password.mismatch"),
                    path: ["confirmPassword"],
                });
            }
            if (password === oldPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: t("validation.password.sameAsOld"),
                    path: ["password"],
                });
            }
        });
};
