import { Calendar, Gift, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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

interface EventCardProps {
  id: string;
  title: string;
  description?: string;
  eventDate?: string;
  giftsCount: number;
  onSelect: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

export function EventCard({
  title,
  description,
  eventDate,
  giftsCount,
  onSelect,
  onDelete,
  isOwner,
}: EventCardProps) {
  return (
    <div 
      className="bg-card rounded-xl p-4 sm:p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer group"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {isOwner && onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this event and all its gifts. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {eventDate && (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(eventDate), "MMM d, yyyy")}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Gift className="h-4 w-4" />
          <span>{giftsCount} {giftsCount === 1 ? 'gift' : 'gifts'}</span>
        </div>
      </div>
    </div>
  );
}