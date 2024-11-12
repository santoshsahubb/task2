import { z } from 'zod';
export const createActivityLogSchema = z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    action: z.string().min(1, { message: "Action is required" }),
    service: z.string().min(1, { message: "Service is required" }),
});
export const getActivityLogSchema = z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
});
