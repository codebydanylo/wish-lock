-- Create events table for different occasions
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Public can view events"
ON public.events
FOR SELECT
USING (true);

CREATE POLICY "Owner can insert events"
ON public.events
FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owner can update own events"
ON public.events
FOR UPDATE
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owner can delete own events"
ON public.events
FOR DELETE
USING (auth.uid() = owner_id);

-- Add event_id to gifts table
ALTER TABLE public.gifts
ADD COLUMN event_id UUID REFERENCES public.events(id) ON DELETE CASCADE;

-- Create trigger for updated_at on events
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();