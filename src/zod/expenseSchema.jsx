import { z } from "zod";

export const expenseSchema = z.object({
    name: z
        .string()
        .min(1, "Nama Pengeluaran harus diisi")
        .max(100, "Maksimal 100 karakter"),
    price: z
        .string()
        .min(1, "Harga Pengeluaran harus diisi")
        .refine(
            (val) => {
                const parsed = parseFloat(val);
                return !Number.isNaN(parsed) && parsed > 0;
            },
            { message: "Harga Pengeluaran harus berupa angka positif" },
        )
        .refine(
            (val) => {
                const parsed = parseFloat(val);
                return parsed >= 1000;
            },
            {
                message: "Harga Pengeluaran tidak boleh kurang dari 1.000",
            },
        )
        .refine(
            (val) => {
                if (!val || Number.isNaN(Number(val))) return false;
                const parsed = BigInt(val);
                return parsed <= 9007199254740992n;
            },
            {
                message:
                    "Harga Pengeluaran tidak boleh lebih dari 9.007.199.254.740.992",
            },
        ),
    expenseDate: z.any(),
});
