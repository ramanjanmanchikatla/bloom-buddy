import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Droplet, 
  CloudDrizzle, 
  Lightbulb, 
  Pencil, 
  ThermometerSun, 
  Trash, 
  X
} from "lucide-react";
import { usePlants } from "@/hooks/use-plants";
import { useReminders } from "@/hooks/use-reminders";

const PlantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { plants, updatePlant } = usePlants();
  const { reminders, addReminder, updateReminder, deleteReminder } = useReminders(Number(id));
  const plant = plants.find((p) => p.id === Number(id)) || null;
  const plantReminders = reminders.filter((r) => r.plant_id === Number(id));
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(plant?.name || "");
  const [newReminderType, setNewReminderType] = useState<"water" | "fertilize" | "rotate" | "repot">("water");
  const [newReminderDate, setNewReminderDate] = useState("");

  useEffect(() => {
    if (!plant) {
      navigate("/my-plants");
      toast({
        title: "Plant not found",
        description: "The plant you're looking for doesn't exist",
        variant: "destructive",
      });
    }
  }, [plant, navigate, toast]);

  const handleSaveName = () => {
    if (!plant) return;
    
    if (editedName.trim() === "") {
      toast({
        title: "Invalid name",
        description: "Plant name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    updatePlant({ id: plant.id, plantData: { name: editedName } });
    
    setIsEditing(false);
    
    toast({
      title: "Name updated",
      description: "Your plant's name has been updated",
    });
  };

  const handleAddReminder = () => {
    if (!plant) return;
    
    if (!newReminderDate) {
      toast({
        title: "Invalid date",
        description: "Please select a date for the reminder",
        variant: "destructive",
      });
      return;
    }
    
    addReminder({
      plant_id: plant.id,
      task_type: newReminderType,
      due_date: newReminderDate,
      is_completed: false
    });
    
    // Reset form
    setNewReminderType("water");
    setNewReminderDate("");
    
    toast({
      title: "Reminder added",
      description: `A new ${newReminderType} reminder has been set`,
    });
  };

  const handleDeleteReminder = (reminderId: number) => {
    deleteReminder(reminderId);
    
    toast({
      title: "Reminder deleted",
      description: "The reminder has been removed",
    });
  };

  const handleCompleteReminder = (reminderId: number) => {
    const reminder = plantReminders.find(r => r.id === reminderId);
    if (!reminder) return;
    updateReminder({ id: reminderId, reminderData: { is_completed: !reminder.is_completed } });
  };

  if (!plant) return null;

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Plant Image */}
          <div className="lg:w-1/2">
            <div className="aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
              <img
                src={plant.image_url}
                alt={plant.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Plant Details */}
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-plant-500"
                    autoFocus
                  />
                  <Button onClick={handleSaveName} className="bg-plant-500 hover:bg-plant-600">
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(plant.name);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-semibold text-plant-800">
                    {plant.name}
                  </h1>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <p className="text-muted-foreground">{plant.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-plant-50 p-4 rounded-lg flex gap-3">
                <Droplet className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Watering</div>
                  <div>{plant.watering_frequency}</div>
                </div>
              </div>
              
              <div className="bg-plant-50 p-4 rounded-lg flex gap-3">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Light</div>
                  <div>{plant.light_level}</div>
                </div>
              </div>
              
              <div className="bg-plant-50 p-4 rounded-lg flex gap-3">
                <ThermometerSun className="h-5 w-5 text-red-500" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Temperature</div>
                  <div>{plant.temperature}</div>
                </div>
              </div>
              
              <div className="bg-plant-50 p-4 rounded-lg flex gap-3">
                <CloudDrizzle className="h-5 w-5 text-plant-500" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Humidity</div>
                  <div>{plant.humidity}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reminders Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-plant-800 mb-6">Plant Care Reminders</h2>
          
          {/* Add Reminder Form */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Add New Reminder</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex-grow min-w-[180px]">
                <label className="block text-sm font-medium text-gray-500 mb-1">Type</label>
                <select
                  value={newReminderType}
                  onChange={(e) => setNewReminderType(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-plant-500"
                >
                  <option value="water">Water</option>
                  <option value="fertilize">Fertilize</option>
                  <option value="rotate">Rotate</option>
                  <option value="repot">Repot</option>
                </select>
              </div>
              
              <div className="flex-grow min-w-[180px]">
                <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                <input
                  type="date"
                  value={newReminderDate}
                  onChange={(e) => setNewReminderDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-plant-500"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleAddReminder}
                  className="bg-plant-500 hover:bg-plant-600 h-10"
                >
                  Add Reminder
                </Button>
              </div>
            </div>
          </div>
          
          {/* Reminders List */}
          {plantReminders.length > 0 ? (
            <div className="space-y-4">
              {plantReminders.map((reminder) => (
                <div 
                  key={reminder.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    reminder.is_completed ? 'bg-gray-50 opacity-60' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      {reminder.task_type === "water" && <Droplet className="h-5 w-5 text-blue-500" />}
                      {reminder.task_type === "fertilize" && <Droplet className="h-5 w-5 text-green-500" />}
                      {reminder.task_type === "rotate" && <Droplet className="h-5 w-5 text-amber-500" />}
                      {reminder.task_type === "repot" && <Droplet className="h-5 w-5 text-soil-500" />}
                    </div>
                    <div>
                      <div className="font-medium capitalize">
                        {reminder.task_type} {plant.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(reminder.due_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={reminder.is_completed ? "outline" : "default"}
                      size="sm"
                      className={reminder.is_completed ? "border-plant-200" : "bg-plant-500 hover:bg-plant-600"}
                      onClick={() => handleCompleteReminder(reminder.id)}
                    >
                      {reminder.is_completed ? "Completed" : "Mark Complete"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No reminders yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your first care reminder for this plant
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
