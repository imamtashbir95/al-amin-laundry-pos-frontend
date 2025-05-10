import { z } from "zod";

export const createBaseSignUpSchema = (t) => z.object({
    gender: z.string().min(1, t("validation.gender.required")),
    language: z.string().min(1, t("validation.language.required")),
    phoneNumber: z
        .string()
        .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, t("validation.phoneNumber.invalid"))
        .min(10, t("validation.phoneNumber.min"))
        .max(15, t("validation.phoneNumber.max")),
});
