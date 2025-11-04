import { Button } from "@/components/ui/button";
import { Gift, Heart, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-primary rounded-full p-4">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Your Perfect Gift Wishlist
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create your wishlist, share it with friends, and let them reserve gifts
            without duplicates. Simple, elegant, and thoughtful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/owner">
              <Button size="lg" className="gap-2 min-w-[200px]">
                <Gift className="w-5 h-5" />
                Create My Wishlist
              </Button>
            </Link>
            <Link to="/guest">
              <Button size="lg" variant="outline" className="gap-2 min-w-[200px]">
                <Users className="w-5 h-5" />
                View Wishlist
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-card rounded-xl p-6 shadow-card text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
            <p className="text-muted-foreground">
              Add, edit, and organize your gifts effortlessly with our simple interface
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card text-center">
            <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Duplicates</h3>
            <p className="text-muted-foreground">
              One gift, one person. Our reservation system prevents duplicate purchases
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card text-center">
            <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Easily</h3>
            <p className="text-muted-foreground">
              Get a shareable link to send to friends and family in seconds
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-card">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mb-4 font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3">For Gift Receivers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Create your wishlist</li>
                <li>✓ Add gifts with photos and links</li>
                <li>✓ Share your unique link</li>
                <li>✓ See who reserved what</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-card">
              <div className="bg-success text-success-foreground rounded-full w-10 h-10 flex items-center justify-center mb-4 font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3">For Gift Givers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Open the shared link</li>
                <li>✓ Browse available gifts</li>
                <li>✓ Reserve your choice</li>
                <li>✓ Your name stays private to others</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
