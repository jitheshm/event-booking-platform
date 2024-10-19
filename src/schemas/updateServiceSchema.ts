import z from 'zod';

const isValidDateString = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Returns true if the date is valid
};

export const updateServiceSchema = z.object({
    title: z.string()
        .trim()
        .min(3, { message: "Title must be at least 3 characters long." })
        .max(100, { message: "Title must be at most 100 characters long." })
        .refine((val) => /^[A-Za-z0-9\s]+$/.test(val), {
            message: "Title can only contain letters, numbers, and spaces.",
        })
        .optional(),

    price_per_day: z.number()
        .min(0, { message: "Price per day must be a non-negative number" })
        .optional(),

    category: z.string()
        .trim()
        .min(3, { message: "Category must have at least 3 characters" })
        .regex(/^[A-Za-z\s]+$/, { message: "Category must only contain letters" })
        .optional(),

    availability_dates: z.array(z.string().refine(isValidDateString, {
        message: "Each date must be a valid date string."
    }))
    .optional(),

    description: z.string()
        .trim()
        .min(10, { message: "Description must have at least 10 characters" })
        .optional()
}).refine((data) => {
    return Object.values(data).some(value => value !== undefined && value !== null);
}, {
    message: "At least one field is required."
});
