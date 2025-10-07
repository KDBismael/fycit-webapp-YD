import { z } from 'zod';

export const profileCompletionSchema = z.object({
  guild: z
    .string()
    .min(1, 'Please select a guild'),
  locale: z
    .string()
    .min(1, 'Please select a locale'),
  country: z
    .string()
    .min(1, 'Please select your country'),
  zipCode: z
    .string()
    .optional(),
});

export type ProfileCompletionFormData = z.infer<typeof profileCompletionSchema>;
