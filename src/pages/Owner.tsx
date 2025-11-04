import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GiftCard } from "@/components/GiftCard";
import { AddGiftDialog } from "@/components/AddGiftDialog";
import { Gift, Heart, Share2, ArrowLeft, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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

const Owner = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
        fetchGifts();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("gifts").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gift deleted successfully",
      });

      fetchGifts();
    } catch (error) {
      console.error("Error deleting gift:", error);
      toast({
        title: "Error",
        description: "Failed to delete gift",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    const guestUrl = `${window.location.origin}/guest`;
    navigator.clipboard.writeText(guestUrl);
    toast({
      title: "Link copied!",
      description: "Share this link with your friends",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
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

        <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              My Wishlist
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your gift wishlist</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button onClick={handleShare} variant="outline" className="gap-2 flex-1 sm:flex-none" size="sm">
              <Share2 className="w-4 h-4" />
              <span className="hidden xs:inline">Share Link</span>
              <span className="xs:hidden">Share</span>
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 flex-1 sm:flex-none" size="sm">
              <Gift className="w-4 h-4" />
              <span className="hidden xs:inline">Add Gift</span>
              <span className="xs:hidden">Add</span>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="gap-2 w-full sm:w-auto" size="sm">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
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
            <h3 className="text-xl font-semibold mb-2">No gifts yet</h3>
            <p className="text-muted-foreground mb-6">
              Start adding gifts to your wishlist
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Add Your First Gift
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                isOwner={true}
                onDelete={handleDelete}
                onUpdate={fetchGifts}
              />
            ))}
          </div>
        )}

        <AddGiftDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSuccess={fetchGifts}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Owner;
