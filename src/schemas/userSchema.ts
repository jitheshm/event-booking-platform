import z from 'zod'

const isUniqueDigits = (value: string) => new Set(value).size > 1;

export const userSchema = z.object({
    name: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["user", "provider"]).refine(val => val === "user" || val === "provider", {
        message: "Role must be either 'user' or 'provider'",
    }),
    mobile: z.string()
        .length(10, { message: "Mobile number must be exactly 10 digits" })
        .regex(/^\d{10}$/, { message: "Mobile number must only contain digits" })
        .refine(isUniqueDigits, { message: "Mobile number cannot have all the same digits" })
});
