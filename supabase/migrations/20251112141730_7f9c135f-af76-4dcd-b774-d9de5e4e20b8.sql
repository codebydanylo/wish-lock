-- Add category column to gifts table
ALTER TABLE public.gifts 
ADD COLUMN category text DEFAULT 'other';

-- Add check constraint for valid categories
ALTER TABLE public.gifts
ADD CONSTRAINT valid_gift_category CHECK (
  category IN ('electronics', 'clothing', 'books', 'toys', 'home', 'sports', 'beauty', 'food', 'other')
);