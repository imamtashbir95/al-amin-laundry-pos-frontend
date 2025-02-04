import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .min(3, "Nama minimal 3 karakter")
        .max(100, "Nama maksimal 100 karakter"),
    email: z
        .string()
        .email("Format Email tidak valid")
        .min(5, "Email minimal 5 karakter")
        .max(50, "Email maksimal 50 karakter"),
    username: z
        .string()
        .min(3, "Username minimal 3 karakter")
        .max(25, "Username maksimal 25 karakter")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username hanya boleh mengandung huruf, angka, dan tanda garis bawah (_)",
        ),
    password: z
        .string()
        .min(8, "Kata Sandi minimal 8 karakter")
        .max(255, "Kata Sandi maksimal 255 karakter")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).*$/,
            "Kata Sandi harus terdiri dari satu huruf kapital, satu angka, dan satu karakter khusus (!@#$%^&*()).",
        ),
    role: z.string(),
});
