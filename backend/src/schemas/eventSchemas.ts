import { z } from 'zod';

export const getEventsQuerySchema = z.object({
    name: z.string().optional(),
    from: z.string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), { message: 'Invalid start date' })
        .transform((val) => val ? new Date(val).toISOString() : undefined),
    to: z.string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), { message: 'Invalid end date' })
        .transform((val) => val ? new Date(val).toISOString() : undefined),
});

export const eventSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    from: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid start date' })
        .transform((val) => new Date(val).toISOString()),
    to: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid end date' })
        .transform((val) => new Date(val).toISOString()),
});

export const updateEventSchema = eventSchema;

export const idParamSchema = z.object({
    id: z.coerce.number().positive().int(),
});
