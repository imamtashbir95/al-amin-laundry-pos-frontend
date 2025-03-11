import { z } from "zod";

export const signInSchema = z.object({
    username: z.string().min(1, "Username harus diisi"),
    password: z.string().min(1, "Kata sandi harus diisi"),
});
