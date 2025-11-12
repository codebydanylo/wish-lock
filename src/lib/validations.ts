import { z } from "zod";

export const GIFT_CATEGORIES = [
  { value: "electronics", label: "Электроника", icon: "💻" },
  { value: "clothing", label: "Одежда", icon: "👕" },
  { value: "books", label: "Книги", icon: "📚" },
  { value: "toys", label: "Игрушки", icon: "🧸" },
  { value: "home", label: "Для дома", icon: "🏠" },
  { value: "sports", label: "Спорт", icon: "⚽" },
  { value: "beauty", label: "Красота", icon: "💄" },
  { value: "food", label: "Еда", icon: "🍰" },
  { value: "other", label: "Другое", icon: "🎁" },
] as const;

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
  category: z.enum([
    "electronics",
    "clothing", 
    "books",
    "toys",
    "home",
    "sports",
    "beauty",
    "food",
    "other"
  ]).default("other"),
});

export const guestNameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[a-zA-Z0-9\s\-']+$/, "Name contains invalid characters");
