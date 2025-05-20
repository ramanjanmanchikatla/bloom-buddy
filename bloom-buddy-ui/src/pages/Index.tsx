
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Search, Sprout, Sun, ThermometerSun } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-plant-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl font-bold text-plant-800 leading-tight">
              Your Personal Plant Care Assistant
            </h1>
            <p className="text-lg text-plant-700 max-w-lg">
              Keep your plants thriving with customized care routines, timely reminders, 
              and expert advice tailored to each plant's unique needs.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-plant-500 hover:bg-plant-600 text-white px-8 py-6" 
                size="lg"
                asChild
              >
                <Link to="/identify">Identify Plant</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-plant-300 text-plant-700 hover:bg-plant-50 px-8 py-6" 
                size="lg"
                asChild
              >
                <Link to="/my-plants">View My Plants</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-plant-200 rounded-full opacity-30 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9" 
              alt="Plant care" 
              className="relative z-10 rounded-2xl shadow-xl max-w-md mx-auto animate-float"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-plant-800 mb-12">
            How PlantCare Helps Your Plants Thrive
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-plant-50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="bg-plant-100 p-4 rounded-full mb-4">
                <Search size={28} className="text-plant-600" />
              </div>
              <h3 className="text-xl font-semibold text-plant-800 mb-2">Identify Any Plant</h3>
              <p className="text-plant-700">
                Instantly identify plants by uploading a photo and get tailored care instructions.
              </p>
            </div>
            
            <div className="bg-plant-50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="bg-plant-100 p-4 rounded-full mb-4">
                <Droplet size={28} className="text-plant-600" />
              </div>
              <h3 className="text-xl font-semibold text-plant-800 mb-2">Personalized Care</h3>
              <p className="text-plant-700">
                Get custom watering schedules, light recommendations, and care tips for each plant.
              </p>
            </div>
            
            <div className="bg-plant-50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="bg-plant-100 p-4 rounded-full mb-4">
                <ThermometerSun size={28} className="text-plant-600" />
              </div>
              <h3 className="text-xl font-semibold text-plant-800 mb-2">Smart Reminders</h3>
              <p className="text-plant-700">
                Never forget to water, fertilize, or rotate your plants with our smart reminder system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-plant-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-plant-800 mb-6">
              Ready to Give Your Plants the Care They Deserve?
            </h2>
            <p className="text-lg text-plant-700 mb-8">
              Join thousands of plant lovers who use PlantCare to keep their indoor and outdoor plants thriving.
            </p>
            <Button 
              className="bg-plant-500 hover:bg-plant-600 text-white px-8 py-6" 
              size="lg"
              asChild
            >
              <Link to="/identify">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-plant-800 mb-12">
            What Plant Lovers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
              <div className="flex items-center space-x-1 mb-4">
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
              </div>
              <p className="text-gray-700 mb-4">
                "My plants have never been healthier! The reminders and care tips are so helpful for a forgetful plant parent like me."
              </p>
              <p className="font-medium text-plant-800">— Jamie S.</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
              <div className="flex items-center space-x-1 mb-4">
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
              </div>
              <p className="text-gray-700 mb-4">
                "The plant identification feature is incredible. I can now properly care for plants that were gifted to me without labels!"
              </p>
              <p className="font-medium text-plant-800">— Alex T.</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
              <div className="flex items-center space-x-1 mb-4">
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
                <Sun className="text-amber-400 h-4 w-4" />
              </div>
              <p className="text-gray-700 mb-4">
                "As a plant enthusiast with over 50 plants, this app has saved me so much time and my collection is thriving!"
              </p>
              <p className="font-medium text-plant-800">— Morgan L.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
