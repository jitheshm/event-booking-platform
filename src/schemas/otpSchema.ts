import z from 'zod'


export const otpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    otp: z.string().length(6, { message: "OTP must be exactly 6 characters" }),
    context: z.string().min(1, { message: "Context is required" })
});