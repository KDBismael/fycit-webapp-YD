import { z } from 'zod';

export const verifyAccountSchema = z.object({
  code: z
    .string()
    .min(6, 'Code must be 6 digits')
    .max(6, 'Code must be 6 digits')
    .regex(/^\d{6}$/, 'Code must contain only numbers'),
});

export type VerifyAccountFormData = z.infer<typeof verifyAccountSchema>;
