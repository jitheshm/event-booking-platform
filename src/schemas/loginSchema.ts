import z from 'zod'

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["user", "provider"]).refine(val => val === "user" || val === "provider", {
        message: "Role must be either 'user' or 'provider'",
    }),
});
