import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .pipe(z.email("Invalid email address"))
    .transform((v) => v.toLowerCase()),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
  website: z.string().optional(),
  formToken: z.string().min(1, "Security token missing"),
})

export type ContactInput = z.infer<typeof contactSchema>