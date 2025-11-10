-- Step 1: Clean up orphaned gifts with NULL owner_id
DELETE FROM public.gifts WHERE owner_id IS NULL;

-- Step 2: Add NOT NULL constraint to gifts.owner_id
ALTER TABLE public.gifts 
ALTER COLUMN owner_id SET NOT NULL;