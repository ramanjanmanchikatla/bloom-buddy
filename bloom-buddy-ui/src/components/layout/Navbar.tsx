
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Droplet size={24} className="text-plant-500" />
          <span className="font-poppins font-bold text-xl text-plant-800">
            PlantCare
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-plant-500 ${
              isActive("/") ? "text-plant-500" : "text-foreground"
            }`}
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                to="/identify"
                className={`text-sm font-medium transition-colors hover:text-plant-500 ${
                  isActive("/identify") ? "text-plant-500" : "text-foreground"
                }`}
              >
                Identify Plant
              </Link>
              <Link
                to="/my-plants"
                className={`text-sm font-medium transition-colors hover:text-plant-500 ${
                  isActive("/my-plants") ? "text-plant-500" : "text-foreground"
                }`}
              >
                My Plants
              </Link>
              <Link
                to="/reminders"
                className={`text-sm font-medium transition-colors hover:text-plant-500 ${
                  isActive("/reminders") ? "text-plant-500" : "text-foreground"
                }`}
              >
                Reminders
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-plant-100 flex items-center justify-center">
                  <User size={16} className="text-plant-700" />
                </div>
                <span className="text-sm font-medium">{user.email?.split('@')[0] || 'User'}</span>
              </div>
              <Button
                variant="outline"
                className="border-plant-300 text-plant-700 hover:bg-plant-50"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="hidden md:flex border-plant-300 text-plant-700 hover:bg-plant-50"
                asChild
              >
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button className="bg-plant-500 hover:bg-plant-600" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
