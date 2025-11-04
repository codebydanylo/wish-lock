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
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 max-w-6xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-gradient-primary rounded-full p-3 sm:p-4">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6 px-2">
            Your Perfect Gift Wishlist
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-4">
            Create your wishlist, share it with friends, and let them reserve gifts
            without duplicates. Simple, elegant, and thoughtful.
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-16">
          <div className="bg-card rounded-xl p-5 sm:p-6 shadow-card text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Gift className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Easy Management</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Add, edit, and organize your gifts effortlessly with our simple interface
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 sm:p-6 shadow-card text-center">
            <div className="bg-success/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-success" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Duplicates</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              One gift, one person. Our reservation system prevents duplicate purchases
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 sm:p-6 shadow-card text-center sm:col-span-2 md:col-span-1">
            <div className="bg-accent/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Share Easily</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Get a shareable link to send to friends and family in seconds
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12 px-4">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-card rounded-xl p-6 sm:p-7 md:p-8 shadow-card">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mb-3 sm:mb-4 font-bold text-base sm:text-lg">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">For Gift Receivers</h3>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>✓ Create your wishlist</li>
                <li>✓ Add gifts with photos and links</li>
                <li>✓ Share your unique link</li>
                <li>✓ See who reserved what</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 sm:p-7 md:p-8 shadow-card">
              <div className="bg-success text-success-foreground rounded-full w-10 h-10 flex items-center justify-center mb-3 sm:mb-4 font-bold text-base sm:text-lg">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">For Gift Givers</h3>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>✓ Open the shared link</li>
                <li>✓ Browse available gifts</li>
                <li>✓ Reserve your choice</li>
                <li>✓ Your name stays private to others</li>
              </ul>
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
