import { z } from 'zod';

export const verifyAccountSchema = z.object({
  code: z
    .string()
    .min(4, 'Code must be 4 digits')
    .max(4, 'Code must be 4 digits')
    .regex(/^\d{4}$/, 'Code must contain only numbers'),
});

export type VerifyAccountFormData = z.infer<typeof verifyAccountSchema>;
