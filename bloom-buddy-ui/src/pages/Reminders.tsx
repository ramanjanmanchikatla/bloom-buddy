import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReminderCard from "@/components/ReminderCard";
import { Calendar, Check, Clock, Filter } from "lucide-react";
import { useReminders } from "@/hooks/use-reminders";
import { usePlants } from "@/hooks/use-plants";

type FilterType = "all" | "upcoming" | "overdue" | "completed";

const Reminders = () => {
  const { reminders, addReminder, updateReminder, deleteReminder } = useReminders();
  const { plants } = usePlants();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleComplete = (id: number) => {
    const reminder = reminders.find(r => r.id === id);
    if (!reminder) return;
    updateReminder({ id, reminderData: { is_completed: !reminder.is_completed } });
  };
  
  const filteredReminders = reminders.filter(reminder => {
    const today = new Date();
    const dueDate = new Date(reminder.due_date);
    
    switch (filter) {
      case "upcoming":
        return !reminder.is_completed && dueDate >= today;
      case "overdue":
        return !reminder.is_completed && dueDate < today;
      case "completed":
        return reminder.is_completed;
      default:
        return true;
    }
  });
  
  // Sort by date (overdue first, then upcoming)
  filteredReminders.sort((a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    
    if (a.is_completed && !b.is_completed) return 1;
    if (!a.is_completed && b.is_completed) return -1;
    
    if (!a.is_completed && !b.is_completed) {
      const todayDate = new Date();
      const aOverdue = dateA < todayDate;
      const bOverdue = dateB < todayDate;
      
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
    }
    
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="section-title mb-2">Plant Care Reminders</h1>
          <p className="text-muted-foreground">
            Never miss a watering day or other plant care tasks.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="dropdown relative">
            <Button variant="outline" className="flex gap-2 items-center">
              <Filter className="h-4 w-4" />
              {filter === "all" && "All Reminders"}
              {filter === "upcoming" && "Upcoming"}
              {filter === "overdue" && "Overdue"}
              {filter === "completed" && "Completed"}
            </Button>
            <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 hidden opacity-0 transition-opacity group-hover:opacity-100 group-hover:block">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-100" 
                onClick={() => setFilter("all")}
              >
                All Reminders
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-100" 
                onClick={() => setFilter("upcoming")}
              >
                Upcoming
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-100" 
                onClick={() => setFilter("overdue")}
              >
                Overdue
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-100" 
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          className={filter === "all" ? "bg-plant-500 hover:bg-plant-600" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "upcoming" ? "default" : "outline"}
          className={filter === "upcoming" ? "bg-plant-500 hover:bg-plant-600" : ""}
          onClick={() => setFilter("upcoming")}
        >
          <Clock className="h-4 w-4 mr-2" />
          Upcoming
        </Button>
        <Button
          variant={filter === "overdue" ? "default" : "outline"}
          className={filter === "overdue" ? "bg-plant-500 hover:bg-plant-600" : ""}
          onClick={() => setFilter("overdue")}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Overdue
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          className={filter === "completed" ? "bg-plant-500 hover:bg-plant-600" : ""}
          onClick={() => setFilter("completed")}
        >
          <Check className="h-4 w-4 mr-2" />
          Completed
        </Button>
      </div>

      {filteredReminders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReminders.map((reminder) => {
            const plant = plants.find(p => p.id === reminder.plant_id);
            if (!plant) return null;
            
            return (
              <ReminderCard
                key={reminder.id}
                id={reminder.id}
                plantId={plant.id}
                plantName={plant.name}
                plantImage={plant.image_url}
                taskType={reminder.task_type}
                dueDate={reminder.due_date}
                isCompleted={reminder.is_completed}
                onComplete={handleComplete}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Calendar className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No reminders found</h3>
          <p className="text-muted-foreground mb-6">
            {filter !== "all"
              ? `No ${filter} reminders at the moment`
              : "You haven't set any plant care reminders yet"}
          </p>
          <Button className="bg-plant-500 hover:bg-plant-600" asChild>
            <Link to="/my-plants">
              Manage Plants
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reminders;
