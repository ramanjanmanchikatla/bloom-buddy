
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <div className="flex items-center justify-center bg-plant-500 text-white text-sm py-1">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></span>
          Connected to Supabase
        </span>
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
