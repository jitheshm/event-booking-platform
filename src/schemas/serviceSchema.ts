import z from 'zod';

const isUniqueDigits = (value: string) => new Set(value).size > 1;

const isValidDateString = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Returns true if the date is valid
};

export const serviceSchema = z.object({
    title: z.string()
        .trim()
        .min(3, { message: "Title must be at least 3 characters long." })
        .max(100, { message: "Title must be at most 100 characters long." })
        .refine((val) => /^[A-Za-z0-9\s]+$/.test(val), {
            message: "Title can only contain letters, numbers, and spaces.",
        }),
    price_per_day: z.number()
        .min(0, { message: "Price per day must be a non-negative number" }),

    category: z.string()
        .trim()
        .min(3, { message: "Category must have at least 3 characters" })
        .regex(/^[A-Za-z\s]+$/, { message: "Category must only contain letters" }),

    availability_dates: z.array(z.string().refine(isValidDateString, {
        message: "Each date must be a valid date string."
    })),

    contact_details: z.object({
        mobile: z.string()
            .length(10, { message: "Mobile number must be exactly 10 digits" })
            .regex(/^\d{10}$/, { message: "Mobile number must only contain digits" })
            .refine(isUniqueDigits, { message: "Mobile number cannot have all the same digits" }),
    }),

    description: z.string()
        .trim()
        .min(10, { message: "Description must have at least 10 characters" })
});
