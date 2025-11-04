import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { giftSchema } from "@/lib/validations";
import { z } from "zod";

interface AddGiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  userId: string | null;
}

export const AddGiftDialog = ({
  open,
  onOpenChange,
  onSuccess,
  userId,
}: AddGiftDialogProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setTitle("");
    setLink("");
    setDescription("");
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please log in to add gifts",
        variant: "destructive",
      });
      return;
    }

    // Validate input
    try {
      giftSchema.parse({
        title: title.trim(),
        link: link.trim() || "",
        description: description.trim() || "",
        image_url: imageUrl.trim() || "",
      });
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
      const { error } = await supabase.from("gifts").insert({
        title: title.trim(),
        link: link.trim() || null,
        description: description.trim() || null,
        image_url: imageUrl.trim() || null,
        status: "available",
        owner_id: userId,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Gift added to your wishlist",
      });

      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Error adding gift:", error);
      toast({
        title: "Error",
        description: "Failed to add gift",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Gift</DialogTitle>
            <DialogDescription>
              Add a gift to your wishlist. Fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Gift name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="link">Link (Optional)</Label>
              <Input
                id="link"
                type="url"
                placeholder="https://shop.com/item"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add details about this gift..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Gift"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
