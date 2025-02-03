import { z } from "zod";

export const productSchema = z.object({
    name: z
        .string()
        .min(1, "Nama Produk harus diisi")
        .max(100, "Maksimal 100 karakter"),
    price: z
        .string()
        .min(1, "Harga Produk harus diisi")
        .refine(
            (val) => {
                const parsed = parseFloat(val);
                return !Number.isNaN(parsed) && parsed > 0;
            },
            { message: "Harga Produk harus berupa angka positif" },
        )
        .refine(
            (val) => {
                const parsed = parseFloat(val);
                return parsed >= 1000;
            },
            {
                message: "Harga Produk tidak boleh kurang dari 1.000",
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
                    "Harga Produk tidak boleh lebih dari 9.007.199.254.740.992",
            },
        ),
    type: z
        .string()
        .min(1, "Satuan Produk harus diisi")
        .max(100, "Maksimal 100 karakter"),
});
