
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="text-center px-4">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-plant-200 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-plant-50 rounded-full p-6 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-plant-600"
              >
                <path d="M12 7V12H15" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold mb-6 text-plant-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-plant-700">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-plant-500 hover:bg-plant-600"
            size="lg"
            asChild
          >
            <Link to="/">Back to Homepage</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-plant-300 text-plant-700"
            asChild
          >
            <Link to="/my-plants">View My Plants</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
