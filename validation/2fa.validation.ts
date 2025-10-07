import { z } from 'zod';

export const twoFactorAuthSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
});

export type TwoFactorAuthFormData = z.infer<typeof twoFactorAuthSchema>;
