import { z } from "zod";
import { customerSchema } from "./customerSchema";
import { productSchema } from "./productSchema";

export const transactionSchema = z.object({
    // billId: z.string(),
    customer: z.any(),
    // customer: z
    //     .string()
    //     .min(1, { message: "Pilih konsumen yang valid" })
    //     .refine((val) => !val.includes("Pilih Konsumen"), {
    //         message: "Konsumen tidak boleh bernilai 'Pilih Konsumen'",
    //     }),
    product: z.any(),
    // laundryPackage: z
    //     .string()
    //     .min(1, { message: "Pilih paket laundry yang valid" })
    //     .refine((val) => !val.includes("Pilih Paket Laundry"), {
    //         message: "Paket laundry tidak boleh bernilai 'Pilih Paket Laundry'",
    //     }),
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
                const parsed = parseFloat(val);
                return parsed <= 18446744073709551615;
            },
            {
                message:
                    "Kuantitas tidak boleh lebih dari 18.446.744.073.709.551.615",
            },
        ),
    price: z.string(),
});
