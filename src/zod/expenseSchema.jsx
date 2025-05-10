import { z } from "zod";

export const createExpenseSchema = (t) =>
    z.object({
        name: z.string().min(1, t("validation.name.expense.required")).max(100, t("validation.name.expense.max")),
        price: z
            .string()
            .min(1, t("validation.price.expense.required"))
            .refine(
                (val) => {
                    const parsed = parseFloat(val);
                    return !Number.isNaN(parsed) && parsed > 0;
                },
                { message: t("validation.price.expense.positive") },
            )
            .refine(
                (val) => {
                    const parsed = parseFloat(val);
                    return parsed >= 1000;
                },
                {
                    message: t("validation.price.expense.minValue"),
                },
            )
            .refine(
                (val) => {
                    if (!val || Number.isNaN(Number(val))) return false;
                    const parsed = parseFloat(val);
                    return parsed <= 2147483647;
                },
                {
                    message: t("validation.price.expense.maxValue"),
                },
            ),
        expenseDate: z
            // .string()
            // .min(1, t("validation.expenseDate.required"))
            .any()
            // .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, t("validation.expenseDate.invalid")),
    });
