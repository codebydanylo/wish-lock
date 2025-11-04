import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Trash2, CheckCircle2, XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { guestNameSchema } from "@/lib/validations";
import { z } from "zod";

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

interface GiftCardProps {
  gift: Gift;
  isOwner: boolean;
  onDelete?: (id: string) => void;
  onUpdate: () => void;
}

export const GiftCard = ({ gift, isOwner, onDelete, onUpdate }: GiftCardProps) => {
  const [guestName, setGuestName] = useState("");
  const [showReserveInput, setShowReserveInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleReserve = async () => {
    if (!guestName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to reserve this gift",
        variant: "destructive",
      });
      return;
    }

    // Validate guest name
    try {
      guestNameSchema.parse(guestName.trim());
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("gifts")
        .update({
          status: "reserved",
          reserved_by: guestName.trim(),
          reservation_date: new Date().toISOString(),
        })
        .eq("id", gift.id)
        .eq("status", "available"); // Ensure it's still available

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Gift reserved successfully",
      });

      setShowReserveInput(false);
      setGuestName("");
      onUpdate();
    } catch (error) {
      console.error("Error reserving gift:", error);
      toast({
        title: "Error",
        description: "Failed to reserve gift. It may have been claimed already.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("gifts")
        .update({
          status: "available",
          reserved_by: null,
          reservation_date: null,
        })
        .eq("id", gift.id);

      if (error) throw error;

      toast({
        title: "Reservation cancelled",
        description: "Gift is now available again",
      });

      onUpdate();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast({
        title: "Error",
        description: "Failed to cancel reservation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isAvailable = gift.status === "available";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-elevated duration-300 bg-gradient-card">
      <CardHeader className="p-0">
        {gift.image_url ? (
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src={gift.image_url}
              alt={gift.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            <div className="text-muted-foreground text-6xl">🎁</div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-lg line-clamp-2">{gift.title}</h3>
          <Badge
            variant={isAvailable ? "default" : "secondary"}
            className={isAvailable ? "bg-success" : "bg-reserved"}
          >
            {isAvailable ? (
              <CheckCircle2 className="w-3 h-3 mr-1" />
            ) : (
              <XCircle className="w-3 h-3 mr-1" />
            )}
            {isAvailable ? "Available" : "Reserved"}
          </Badge>
        </div>

        {gift.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {gift.description}
          </p>
        )}

        {gift.link && (
          <a
            href={gift.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            View item
          </a>
        )}

        {isOwner && !isAvailable && gift.reserved_by && (
          <div className="mt-3 p-2 bg-muted rounded text-sm">
            <p className="font-medium">Reserved by: {gift.reserved_by}</p>
            {gift.reservation_date && (
              <p className="text-xs text-muted-foreground">
                {new Date(gift.reservation_date).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {isOwner ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this gift?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the gift
                  from your wishlist.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete?.(gift.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <>
            {isAvailable ? (
              !showReserveInput ? (
                <Button
                  onClick={() => setShowReserveInput(true)}
                  className="w-full"
                  size="sm"
                >
                  Reserve This Gift
                </Button>
              ) : (
                <div className="w-full space-y-2">
                  <Input
                    placeholder="Your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReserve()}
                    disabled={loading}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleReserve} disabled={loading} size="sm" className="flex-1">
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowReserveInput(false);
                        setGuestName("");
                      }}
                      disabled={loading}
                      size="sm"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <Button
                variant="outline"
                disabled
                className="w-full"
                size="sm"
              >
                Already Reserved
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};
