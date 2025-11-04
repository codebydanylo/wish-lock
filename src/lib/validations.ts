import { z } from "zod";

export const giftSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  link: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .regex(/^https?:\/\//, "Only HTTP/HTTPS URLs allowed")
    .max(2000, "URL too long")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  image_url: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .regex(/^https?:\/\//, "Only HTTP/HTTPS URLs allowed")
    .max(2000, "URL too long")
    .optional()
    .or(z.literal("")),
});

export const guestNameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[a-zA-Z0-9\s\-']+$/, "Name contains invalid characters");
