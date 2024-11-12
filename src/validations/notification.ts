import { z } from 'zod';

export const notificationValidate = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" })
});

export type CreateActivityLogInput = z.infer<typeof notificationValidate>;
