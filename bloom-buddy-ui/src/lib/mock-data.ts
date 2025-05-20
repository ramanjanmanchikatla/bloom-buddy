
export interface Plant {
  id: number;
  name: string;
  image: string;
  wateringFrequency: string;
  lightLevel: string;
  temperature: string;
  humidity: string;
  description: string;
}

export interface Reminder {
  id: number;
  plantId: number;
  taskType: "water" | "fertilize" | "rotate" | "repot";
  dueDate: string;
  isCompleted: boolean;
}

export const mockPlants: Plant[] = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    wateringFrequency: "Weekly",
    lightLevel: "Medium",
    temperature: "18-27°C",
    humidity: "High",
    description:
      "The Swiss Cheese Plant, known for its iconic split leaves. It thrives in bright, indirect light and prefers consistent moisture without waterlogging."
  },
  {
    id: 2,
    name: "Snake Plant",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    wateringFrequency: "Bi-weekly",
    lightLevel: "Low to High",
    temperature: "18-27°C",
    humidity: "Low",
    description:
      "One of the most tolerant houseplants, the Snake Plant purifies air and requires minimal care. It can survive in various light conditions and infrequent watering."
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    wateringFrequency: "Weekly",
    lightLevel: "Bright",
    temperature: "18-24°C",
    humidity: "Medium",
    description:
      "A popular indoor tree with large, violin-shaped leaves. It prefers consistent care and doesn't like to be moved frequently."
  },
  {
    id: 4,
    name: "Peace Lily",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    wateringFrequency: "Weekly",
    lightLevel: "Low to Medium",
    temperature: "18-30°C",
    humidity: "High",
    description:
      "Known for its beautiful white flowers and air-purifying qualities. It will dramatically droop when thirsty, making it easy to know when to water."
  },
  {
    id: 5,
    name: "Pothos",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    wateringFrequency: "Weekly",
    lightLevel: "Low to Medium",
    temperature: "18-24°C",
    humidity: "Medium",
    description:
      "An easy-to-grow vining plant that can tolerate various conditions. Perfect for beginners, it can thrive in water or soil."
  }
];

export const mockReminders: Reminder[] = [
  {
    id: 1,
    plantId: 1,
    taskType: "water",
    dueDate: "2025-05-14",
    isCompleted: false
  },
  {
    id: 2,
    plantId: 3,
    taskType: "fertilize",
    dueDate: "2025-05-12",
    isCompleted: false
  },
  {
    id: 3,
    plantId: 2,
    taskType: "water",
    dueDate: "2025-05-18",
    isCompleted: false
  },
  {
    id: 4,
    plantId: 4,
    taskType: "rotate",
    dueDate: "2025-05-10",
    isCompleted: false
  },
  {
    id: 5,
    plantId: 5,
    taskType: "water",
    dueDate: "2025-05-13",
    isCompleted: false
  },
  {
    id: 6,
    plantId: 1,
    taskType: "repot",
    dueDate: "2025-06-15",
    isCompleted: false
  }
];
