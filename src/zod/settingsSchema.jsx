import { createBaseSignUpSchema } from "./signUpBaseSchema";
import { createBaseUserSchema } from "./userBaseSchema";

export const createSettingsSchema = (t) => createBaseUserSchema(t).merge(createBaseSignUpSchema(t));
