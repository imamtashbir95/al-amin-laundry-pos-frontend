import { z } from "zod";
import { createBaseUserSchema } from "./userBaseSchema";
import { createPasswordSchema } from "./passwordSchema";
import { createBaseSignUpSchema } from "./signUpBaseSchema";

export const createSignUpSchema = (t) => {
    return createBaseUserSchema(t)
        .merge(createPasswordSchema(t))
        .merge(createBaseSignUpSchema(t))
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
