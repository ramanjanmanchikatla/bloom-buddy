import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PlantCard from "@/components/PlantCard";
import { Plus, Search } from "lucide-react";
import { usePlants } from "@/hooks/use-plants";

const MyPlants = () => {
  const { plants } = usePlants();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="section-title mb-2">My Plants</h1>
          <p className="text-muted-foreground">
            Keep track of all your plants and their care schedules.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search plants..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-plant-500 w-full sm:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-plant-500 hover:bg-plant-600" asChild>
            <Link to="/identify">
              <Plus className="h-4 w-4 mr-2" />
              Add Plant
            </Link>
          </Button>
        </div>
      </div>

      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              id={plant.id}
              name={plant.name}
              image={plant.image_url}
              wateringFrequency={plant.watering_frequency}
              lightLevel={plant.light_level}
              temperature={plant.temperature}
              // humidity={plant.humidity}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No plants found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? "Try a different search term"
              : "You haven't added any plants yet"}
          </p>
          <Button className="bg-plant-500 hover:bg-plant-600" asChild>
            <Link to="/identify">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Plant
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyPlants;
