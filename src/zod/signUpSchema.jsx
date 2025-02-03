import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .min(3, "Minimal 3 karakter")
        .max(100, "Maksimal 100 karakter"),
    email: z
        .string()
        .email("Format email tidak valid")
        .min(5, "Email minimal 5 karakter")
        .max(50, "Email maksimal 50 karakter"),
    username: z
        .string()
        .min(3, "Minimal 3 karakter")
        .max(25, "Maksimal 25 karakter"),
    password: z
        .string()
        .min(8, "Minimal 8 karakter")
        .max(255, "Maksimal 255 karakter"),
    role: z.string(),
});
