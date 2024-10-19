import z from 'zod';

const isValidDateString = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

const availabilityDateSchema = z.object({
    date: z.string().refine(isValidDateString, {
        message: "Date must be a valid date string.",
    }),
    status: z.string().default('open')
});

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

    availability_dates: z.array(availabilityDateSchema).min(1, {
        message: "At least one availability date is required.",
    }),

    location: z.string()
        .trim()
        .min(3, { message: "locatin must have at least 3 characters" }),

    description: z.string()
        .trim()
        .min(10, { message: "Description must have at least 10 characters" }),
});
