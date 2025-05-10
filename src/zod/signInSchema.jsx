import { z } from "zod";

export const createSignInSchema = (t) => z.object({
    username: z.string().min(1, t("validation.username.required")),
    password: z.string().min(1, t("validation.password.required")),
});
