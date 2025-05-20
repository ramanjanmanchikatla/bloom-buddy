import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Droplet, Sun } from "lucide-react";

interface ReminderCardProps {
  id: number;
  plantId: number;
  plantName: string;
  plantImage: string;
  taskType: string;
  dueDate: string;
  isCompleted: boolean;
  onComplete: (id: number) => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({
  id,
  plantId,
  plantName,
  plantImage,
  taskType,
  dueDate,
  isCompleted,
  onComplete,
}) => {
  const getTaskIcon = () => {
    switch (taskType) {
      case "water":
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case "fertilize":
        return <Sun className="h-5 w-5 text-green-500" />;
      case "rotate":
        return <Sun className="h-5 w-5 text-amber-500" />;
      case "repot":
        return <Sun className="h-5 w-5 text-soil-500" />;
      default:
        return <Droplet className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTaskName = () => {
    switch (taskType) {
      case "water":
        return "Water";
      case "fertilize":
        return "Fertilize";
      case "rotate":
        return "Rotate";
      case "repot":
        return "Repot";
      default:
        return "Care for";
    }
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onComplete(id);
  };

  const isOverdue = new Date(dueDate) < new Date();

  return (
    <Card className={`plant-card transition-all ${isCompleted ? 'opacity-60' : ''}`}>
      <CardContent className="p-4 flex gap-4">
        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={plantImage}
            alt={plantName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <h3 className="text-base font-semibold text-plant-800">{plantName}</h3>
          <div className="flex items-center gap-1 mt-1">
            {getTaskIcon()}
            <span className="text-sm">
              {getTaskName()} plant
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span 
              className={`text-xs ${
                isOverdue && !isCompleted ? 'text-red-500 font-medium' : 'text-muted-foreground'
              }`}
            >
              {isOverdue && !isCompleted ? 'Overdue: ' : ''}
              {new Date(dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant={isCompleted ? "outline" : "default"}
          size="sm" 
          className={`w-full ${
            isCompleted 
              ? "border-plant-200 text-muted-foreground" 
              : "bg-plant-500 hover:bg-plant-600"
          }`}
          onClick={handleComplete}
        >
          {isCompleted ? "Completed" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReminderCard;
