import { z } from "zod";

export const createTransactionSchema = (t) =>
    z.object({
        invoiceId: z.string().min(1, t("validation.invoiceId.required")).max(50, t("validation.invoiceId.max")),
        customer: z.object({
            name: z.string().min(1, t("validation.customer.required")),
        }),
        product: z.object({
            name: z.string().min(1, t("validation.product.required")),
        }),
        qty: z
            .string()
            .min(1, t("validation.qty.required"))
            .refine(
                (val) => {
                    const parsed = parseFloat(val);
                    return !Number.isNaN(parsed) && parsed > 0;
                },
                { message: t("validation.qty.positive") },
            )
            .refine(
                (val) => {
                    if (!val || Number.isNaN(Number(val))) return false;
                    const parsed = parseFloat(val);
                    return parsed <= 2147483647;
                },
                {
                    message: t("validation.qty.maxValue"),
                },
            ),
        price: z.string(),
        paymentStatus: z.string().min(1, t("validation.paymentStatus.required")),
        status: z.string().min(1, t("validation.status.required")),
        finishDate: z
            // .string()
            // .min(1, t("validation.finishDate.required"))
            .any(),
            // .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, t("validation.finishDate.invalid")),
    });
