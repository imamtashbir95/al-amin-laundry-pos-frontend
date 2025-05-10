import { z } from "zod";

export const createProductSchema = (t) =>
    z.object({
        name: z.string().min(1, t("validation.name.product.min")).max(100, t("validation.name.product.max")),
        price: z
            .string()
            .min(1, t("validation.price.product.required"))
            .refine(
                (val) => {
                    const parsed = parseFloat(val);
                    return !Number.isNaN(parsed) && parsed > 0;
                },
                { message: t("validation.price.product.positive") },
            )
            .refine(
                (val) => {
                    const parsed = parseFloat(val);
                    return parsed >= 1000;
                },
                {
                    message: t("validation.price.product.minValue"),
                },
            )
            .refine(
                (val) => {
                    if (!val || Number.isNaN(Number(val))) return false;
                    const parsed = parseFloat(val);
                    return parsed <= 2147483647;
                },
                {
                    message: t("validation.price.product.maxValue"),
                },
            ),
        type: z.string().min(1, t("validation.type.product.required")).max(100, t("validation.type.product.max")),
    });
