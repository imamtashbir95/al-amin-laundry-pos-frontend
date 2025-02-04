import { z } from "zod";

export const transactionSchema = z.object({
    customer: z.any(),
    product: z.any(),
    qty: z
        .string()
        .min(1, "Kuantitas harus diisi")
        .refine(
            (val) => {
                const parsed = parseFloat(val);
                return !Number.isNaN(parsed) && parsed > 0;
            },
            { message: "Kuantitas harus berupa angka positif" },
        )
        .refine(
            (val) => {
                if (!val || Number.isNaN(Number(val))) return false;
                const parsed = BigInt(val);
                return parsed <= 9007199254740992n;
            },
            {
                message:
                    "Kuantitas tidak boleh lebih dari 9.007.199.254.740.992",
            },
        ),
    price: z.string(),
});
