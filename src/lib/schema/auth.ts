import * as z from "zod";
export const AuthSchema = z.object({
  phone_number: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .nonempty("شماره موبایل الزامی است"),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
