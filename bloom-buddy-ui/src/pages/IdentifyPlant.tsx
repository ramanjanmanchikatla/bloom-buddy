import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Search, Upload } from "lucide-react";
import { identifyPlant } from "@/lib/identifyPlant";
import { usePlants } from "@/hooks/use-plants";

const PERENUAL_API_KEY = import.meta.env.VITE_PERENUAL_API_KEY;

async function getPerenualPlantInfo(plantName: string) {
  if (!PERENUAL_API_KEY) return null;
  const response = await fetch(
    `https://perenual.com/api/species-list?key=${PERENUAL_API_KEY}&q=${encodeURIComponent(plantName)}`
  );
  if (!response.ok) return null;
  const data = await response.json();
  return data.data?.[0] || null;
}

function cleanCareField(value: any, type: string) {
  if (
    typeof value === 'string' &&
    value.toLowerCase().includes('upgrade plans to premium')
  ) {
    if (type === 'sunlight') return 'Medium';
    if (type === 'watering') return '2 times a day';
    if (type === 'humidity') return 'Regular atmosphere humidity';
    return 'Not available on free plan';
  }
  if (Array.isArray(value)) {
    const filtered = value.filter(
      v => typeof v === 'string' && !v.toLowerCase().includes('upgrade plans to premium')
    );
    if (filtered.length === 0) {
      if (type === 'sunlight') return 'Medium';
      if (type === 'watering') return '2 times a day';
      if (type === 'humidity') return 'Regular atmosphere humidity';
      return 'Not available on free plan';
    }
    return filtered.join(', ');
  }
  return value || 'N/A';
}

const IdentifyPlant = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [careInfo, setCareInfo] = useState<any>(null);
  const [careSearchedNames, setCareSearchedNames] = useState<string[]>([]);
  const { addPlant } = usePlants();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setSelectedFile(file);
    setIdentifiedPlant(null);
  };

  const handleIdentify = async (file: File) => {
    setLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const result = await identifyPlant(base64);
        setIdentifiedPlant(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddToMyPlants = async () => {
    if (!identifiedPlant) return;
    const suggestion = identifiedPlant.suggestions?.[0];
    const plantName = suggestion?.plant_name || "Unknown";
    const imageUrl = suggestion?.plant_details?.wiki_image?.value || selectedImage || "";
    // Use careInfo for watering, sunlight, etc.
    const watering = careInfo ? cleanCareField(careInfo.watering, 'watering') : "N/A";
    const light = careInfo ? cleanCareField(careInfo.sunlight, 'sunlight') : "N/A";
    const humidity = careInfo ? cleanCareField(careInfo.humidity, 'humidity') : "N/A";
    const temperature = "Medium";
    await addPlant({
      name: plantName,
      image_url: imageUrl,
      watering_frequency: watering,
      light_level: light,
      temperature,
      humidity,
      description: careInfo?.description || ""
    });
    toast({
      title: "Plant added to My Plants",
      description: `${plantName} has been added to your collection.`,
    });
    navigate("/my-plants");
  };

  // After plant is identified, fetch care info from Perenual
  useEffect(() => {
    const suggestion = identifiedPlant?.suggestions?.[0];
    const plantName = suggestion?.plant_name || "";
    const commonNames = suggestion?.plant_details?.common_names || [];
    const genus = plantName.split(" ")[0] || "";
    async function fetchCareInfo() {
      try {
        const namesToTry = [plantName, ...commonNames, genus].filter(Boolean);
        setCareSearchedNames(namesToTry);
        let care = null;
        for (const name of namesToTry) {
          care = await getPerenualPlantInfo(name);
          if (care) break;
        }
        setCareInfo(care);
      } catch (err) {
        setCareInfo(null);
      }
    }
    if (plantName || commonNames.length > 0 || genus) {
      fetchCareInfo();
    } else {
      setCareInfo(null);
      setCareSearchedNames([]);
    }
  }, [identifiedPlant]);

  let careInfoSection: React.ReactNode = null;
  if (identifiedPlant) {
    try {
      if (careInfo) {
        careInfoSection = (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-semibold mb-2 text-green-800">Care Suggestions (Perenual)</h4>
            <div><span className="font-medium">Sunlight:</span> {cleanCareField(careInfo?.sunlight, 'sunlight')}</div>
            <div><span className="font-medium">Watering:</span> {cleanCareField(careInfo?.watering, 'watering')}</div>
            <div><span className="font-medium">Humidity:</span> {cleanCareField(careInfo?.humidity, 'humidity')}</div>
            <div><span className="font-medium">Description:</span> {careInfo?.description || "N/A"}</div>
          </div>
        );
      } else {
        careInfoSection = (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800">
            No care information found for this plant on Perenual.<br />
            <span className="text-xs">Names searched: {careSearchedNames.join(", ")}</span>
          </div>
        );
      }
    } catch (err) {
      console.error('Error rendering care info:', err);
      careInfoSection = (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100 text-red-800">
          An error occurred while displaying care info.
        </div>
      );
    }
  }

  return (
    <div className="page-container">
      <h1 className="section-title text-center">Identify Your Plant</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Upload a clear photo of your plant, and we'll help identify it and provide tailored care instructions.
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center">
              <Upload className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop an image, or click to browse
              </p>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                Upload Image
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md aspect-square mb-6 overflow-hidden rounded-lg">
                <img
                  src={selectedImage}
                  alt="Uploaded plant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 mb-4 w-full max-w-md">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedImage(null)}
                >
                  Upload New
                </Button>
                <Button
                  className="flex-1 bg-plant-500 hover:bg-plant-600 flex items-center gap-2"
                  onClick={() => selectedFile && handleIdentify(selectedFile)}
                  disabled={loading || !selectedFile}
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span>Identifying...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Identify Plant</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {identifiedPlant && (
          (() => {
            const suggestion = identifiedPlant.suggestions?.[0];
            const plantName = suggestion?.plant_name || "Unknown";
            const commonNames = suggestion?.plant_details?.common_names?.join(', ') || "";
            const description = suggestion?.plant_details?.wiki_description?.value || "";
            const probability = suggestion?.probability
              ? (suggestion.probability * 100).toFixed(1) + '%' : "";
            const imageUrl = suggestion?.plant_details?.wiki_image?.value || selectedImage;
            // Plant.id does not provide these fields:
            const wateringFrequency = "N/A";
            const lightLevel = "N/A";
            const temperature = "N/A";
            const humidity = "N/A";
            return (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
                <h2 className="text-2xl font-semibold text-plant-800 mb-4">Identification Result</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img
                      src={imageUrl}
                      alt={plantName}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <h3 className="text-xl font-semibold text-plant-700">
                      {plantName}
                    </h3>
                    {commonNames && (
                      <div className="text-muted-foreground text-sm mb-2">
                        <span className="font-medium">Common names:</span> {commonNames}
                      </div>
                    )}
                    {probability && (
                      <div className="text-muted-foreground text-sm mb-2">
                        <span className="font-medium">Confidence:</span> {probability}
                      </div>
                    )}
                    <p className="text-muted-foreground">
                      {description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium text-gray-500">Watering</div>
                        <div>{careInfo ? cleanCareField(careInfo.watering, 'watering') : "N/A"}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium text-gray-500">Light</div>
                        <div>{careInfo ? cleanCareField(careInfo.sunlight, 'sunlight') : "N/A"}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium text-gray-500">Temperature</div>
                        <div>Medium</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium text-gray-500">Humidity</div>
                        <div>{careInfo ? cleanCareField(careInfo.humidity, 'humidity') : "N/A"}</div>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-6 bg-plant-500 hover:bg-plant-600"
                      onClick={handleAddToMyPlants}
                    >
                      Add to My Plants
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {careInfoSection}
      </div>
    </div>
  );
};

export default IdentifyPlant;
