import { z } from "zod";

export const customerSchema = z.object({
    name: z
        .string()
        .min(1, "Nama Konsumen harus diisi")
        .max(100, "Maksimal 100 karakter"),
    phoneNumber: z
        .string()
        .regex(
            new RegExp(
                /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
            ),
            "Nomor telepon tidak valid",
        )
        .min(10, "Nomor telepon minimal 10 karakter")
        .max(15, "Nomor telepon maksimal 15 karakter"),
    address: z
        .string()
        .min(1, "Alamat harus diisi")
        .max(100, "Maksimal 100 karakter"),
});
