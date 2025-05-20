import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Droplet, Sun, Thermometer } from "lucide-react";

interface PlantCardProps {
  id: number;
  name: string;
  image: string;
  wateringFrequency: string;
  lightLevel: string;
  temperature: string;
}

const PlantCard: React.FC<PlantCardProps> = ({
  id,
  name,
  image,
  wateringFrequency,
  lightLevel,
  temperature,
}) => {
  return (
    <Link to={`/plant/${id}`}>
      <Card className="plant-card h-full transition-all hover:scale-[1.02]">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={image || '/fallback.png'}
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
              e.currentTarget.src = '/fallback.png';
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-plant-800">{name}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-1" title="Watering needs">
            <Droplet size={16} className="text-blue-500" />
            <span className="text-xs text-muted-foreground">{wateringFrequency}</span>
          </div>
          <div className="flex items-center gap-1" title="Light needs">
            <Sun size={16} className="text-amber-500" />
            <span className="text-xs text-muted-foreground">{lightLevel}</span>
          </div>
          <div className="flex items-center gap-1" title="Temperature needs">
            <Thermometer size={16} className="text-red-500" />
            <span className="text-xs text-muted-foreground">{temperature}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PlantCard;
