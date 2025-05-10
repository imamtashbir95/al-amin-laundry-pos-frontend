import { z } from "zod";

export const createCustomerSchema = (t) => z.object({
    name: z.string().min(1, t("validation.name.customer.required")).max(100, t("validation.name.customer.max")),
    phoneNumber: z
        .string()
        .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, t("validation.phoneNumber.customer.invalid"))
        .min(10, t("validation.phoneNumber.customer.min"))
        .max(15, t("validation.phoneNumber.customer.max")),
    address: z.string().min(1, t("validation.address.customer.required")).max(100, t("validation.address.customer.max")),
});
