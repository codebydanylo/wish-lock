-- Add owner_id column to gifts table
ALTER TABLE public.gifts 
ADD COLUMN owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing insecure policies
DROP POLICY IF EXISTS "Anyone can view gifts" ON public.gifts;
DROP POLICY IF EXISTS "Anyone can insert gifts" ON public.gifts;
DROP POLICY IF EXISTS "Anyone can update gifts" ON public.gifts;
DROP POLICY IF EXISTS "Anyone can delete gifts" ON public.gifts;

-- Create secure RLS policies
-- Allow public read access so guests can view the wishlist
CREATE POLICY "Public can view gifts"
ON public.gifts
FOR SELECT
USING (true);

-- Only authenticated owner can insert gifts
CREATE POLICY "Owner can insert gifts"
ON public.gifts
FOR INSERT
WITH CHECK (auth.uid() = owner_id);

-- Only authenticated owner can delete their gifts
CREATE POLICY "Owner can delete own gifts"
ON public.gifts
FOR DELETE
USING (auth.uid() = owner_id);

-- Owner can update their own gifts (for edit/delete)
CREATE POLICY "Owner can update own gifts"
ON public.gifts
FOR UPDATE
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Allow guests to reserve available gifts (limited update)
CREATE POLICY "Guests can reserve available gifts"
ON public.gifts
FOR UPDATE
USING (status = 'available' AND reserved_by IS NULL)
WITH CHECK (
  status = 'reserved' 
  AND reserved_by IS NOT NULL 
  AND reservation_date IS NOT NULL
);