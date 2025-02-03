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
                return parsed <= 18446744073709551615;
            },
            {
                message:
                    "Harga Produk tidak boleh lebih dari 18.446.744.073.709.551.615",
            },
        ),
    type: z
        .string()
        .min(1, "Satuan Produk harus diisi")
        .max(100, "Maksimal 100 karakter"),
});
