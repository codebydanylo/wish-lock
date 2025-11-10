import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Users, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";
import heroGifts from "@/assets/hero-gifts.jpg";
import sharingIllustration from "@/assets/sharing-illustration.jpg";

const Index = () => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "4") {
      setShowPasswordDialog(false);
      setPassword("");
      navigate("/auth");
    } else {
      toast({
        title: "Wrong password",
        description: "Please try again",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        <div className="text-center mb-8 sm:mb-10">
          <div className="mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-card max-w-3xl mx-auto">
            <img 
              src={heroGifts} 
              alt="Beautiful gift boxes" 
              className="w-full h-48 sm:h-64 md:h-80 object-cover"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-2">
            Your Perfect Wishlist
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto px-4">
            Share gifts. No duplicates. Simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button 
              size="lg" 
              className="gap-2 w-full sm:w-auto sm:min-w-[200px]"
              onClick={() => setShowPasswordDialog(true)}
            >
              <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
              Create My Wishlist
            </Button>
            <Link to="/guest" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:min-w-[200px]">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                View Wishlist
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
          <div className="bg-card rounded-xl p-4 sm:p-5 shadow-card text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1">Easy</h3>
            <p className="text-sm text-muted-foreground">
              Simple interface
            </p>
          </div>

          <div className="bg-card rounded-xl p-4 sm:p-5 shadow-card text-center">
            <div className="bg-success/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1">No Duplicates</h3>
            <p className="text-sm text-muted-foreground">
              One gift, one person
            </p>
          </div>

          <div className="bg-card rounded-xl p-4 sm:p-5 shadow-card text-center">
            <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1">Share</h3>
            <p className="text-sm text-muted-foreground">
              Shareable link
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 sm:mt-16">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <img 
                src={sharingIllustration} 
                alt="People sharing gifts" 
                className="w-full rounded-2xl shadow-card hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="order-1 md:order-2 space-y-4 sm:space-y-6">
              <div className="animate-fade-in">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">How It Works</h2>
                <p className="text-muted-foreground">Simple steps for everyone</p>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] group cursor-default">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Create & Share</h3>
                    <p className="text-sm text-muted-foreground">Make your wishlist and share the link</p>
                  </div>
                </div>
                <div className="flex gap-3 animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] group cursor-default">
                  <div className="bg-success text-success-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform duration-300 animate-pulse [animation-delay:300ms]">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Browse & Reserve</h3>
                    <p className="text-sm text-muted-foreground">Friends pick and reserve gifts</p>
                  </div>
                </div>
                <div className="flex gap-3 animate-fade-in opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] group cursor-default">
                  <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform duration-300 animate-pulse [animation-delay:600ms]">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Enjoy</h3>
                    <p className="text-sm text-muted-foreground">No duplicates, perfect gifts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handlePasswordSubmit}>
            <DialogHeader>
              <DialogTitle>Enter Password</DialogTitle>
              <DialogDescription>
                Please enter the password to create your wishlist
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowPasswordDialog(false);
                  setPassword("");
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
