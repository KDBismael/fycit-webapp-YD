import { z } from 'zod';

export const profileCompletionSchema = z.object({
  selectedGuild: z.array(z.string()).min(1, 'Please select at least one guild'),
  viewEventsInLocals: z.array(z.string()).min(1, 'Please select at least one local area'),
  myCountry: z.string().min(1, 'Please select your country'),
  zipPostalCode: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) {
        return true;
      } // Optional field
      return val.length >= 3 && val.length <= 10;
    }, 'Zip/Postal code must be between 3 and 10 characters'),
});

export type ProfileCompletionFormData = z.infer<typeof profileCompletionSchema>;
