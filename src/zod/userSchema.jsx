import { z } from "zod";
import { createPasswordSchema } from "./passwordSchema";
import { createBaseUserSchema } from "./userBaseSchema";

export const createUserSchema = (t) => {
    return createBaseUserSchema(t)
        .merge(createPasswordSchema(t))
        .extend({
            role: z.string(),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
            if (password !== confirmPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: t("validation.password.mismatch"),
                    path: ["confirmPassword"],
                });
            }
        });
};
