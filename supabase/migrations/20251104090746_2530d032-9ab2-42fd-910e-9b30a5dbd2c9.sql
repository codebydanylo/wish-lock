-- Create gifts table
CREATE TABLE public.gifts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT,
  description TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved')),
  reserved_by TEXT,
  reservation_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read gifts (for guest view)
CREATE POLICY "Anyone can view gifts"
  ON public.gifts
  FOR SELECT
  USING (true);

-- Allow anyone to update gifts (for reservations)
-- In a real app you'd want more granular control, but keeping it simple
CREATE POLICY "Anyone can update gifts"
  ON public.gifts
  FOR UPDATE
  USING (true);

-- Allow anyone to insert gifts (for owner actions)
CREATE POLICY "Anyone can insert gifts"
  ON public.gifts
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to delete gifts (for owner actions)
CREATE POLICY "Anyone can delete gifts"
  ON public.gifts
  FOR DELETE
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.gifts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();