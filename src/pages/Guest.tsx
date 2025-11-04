import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GiftCard } from "@/components/GiftCard";
import { Gift, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Gift {
  id: string;
  title: string;
  link: string | null;
  description: string | null;
  image_url: string | null;
  status: string;
  reserved_by: string | null;
  reservation_date: string | null;
}

const Guest = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const { data, error } = await supabase
        .from("gifts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGifts(data || []);
    } catch (error) {
      console.error("Error fetching gifts:", error);
      toast({
        title: "Error",
        description: "Failed to load gifts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-4 sm:mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
            Gift Wishlist
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Choose a gift to reserve - only one person can claim each gift!
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 bg-card rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : gifts.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg shadow-card">
            <Gift className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No gifts available</h3>
            <p className="text-muted-foreground">
              The wishlist is empty right now
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                isOwner={false}
                onUpdate={fetchGifts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guest;
