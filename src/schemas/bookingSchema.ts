import z from 'zod';

const isValidDateString = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};



export const bookingSchema = z.object({
    booking_dates: z.array(z.string().refine(isValidDateString, {
        message: "Each date must be a valid date string.",
    })).min(1, {
        message: "At least one valid availability date is required.",
    }),
});
