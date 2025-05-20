
import React from "react";
import { Droplet } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-1/3">
            <Link to="/" className="flex items-center gap-2">
              <Droplet size={24} className="text-plant-500" />
              <span className="font-poppins font-bold text-xl text-plant-800">
                PlantCare
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-sm">
              Your personalized plant care assistant, helping you keep your
              plants healthy and thriving with tailored care recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-2/3">
            <div>
              <h3 className="font-medium text-base mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-plant-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/identify" className="text-muted-foreground hover:text-plant-500">
                    Identify Plant
                  </Link>
                </li>
                <li>
                  <Link to="/my-plants" className="text-muted-foreground hover:text-plant-500">
                    My Plants
                  </Link>
                </li>
                <li>
                  <Link to="/reminders" className="text-muted-foreground hover:text-plant-500">
                    Reminders
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-plant-500">
                    Plant Care Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-plant-500">
                    Common Issues
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-plant-500">
                    Seasonal Tips
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-plant-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-plant-500">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PlantCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
