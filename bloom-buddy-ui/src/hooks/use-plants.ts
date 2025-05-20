
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/lib/database.types';

type Plant = Database['public']['Tables']['plants']['Row'];

export const usePlants = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  // Get all plants for current user
  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['plants', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        toast({
          title: 'Error fetching plants',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as Plant[];
    },
    enabled: !!user,
  });

  // Get a single plant by ID
  const getPlant = async (id: number): Promise<Plant | null> => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();
      
    if (error) {
      toast({
        title: 'Error fetching plant',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
    
    return data as Plant;
  };

  // Upload an image to Supabase Storage
  const uploadPlantImage = async (file: File): Promise<string | null> => {
    if (!user) return null;
    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `plant_images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('plant_images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('plant_images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: 'Error uploading image',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Add a new plant
  const addPlantMutation = useMutation({
    mutationFn: async (plantData: Omit<Database['public']['Tables']['plants']['Insert'], 'user_id'> & { image?: File }) => {
      if (!user) throw new Error('User not authenticated');
      
      let imageUrl = plantData.image_url;
      
      // Upload image if provided
      if (plantData.image) {
        imageUrl = await uploadPlantImage(plantData.image);
      }
      
      const { data, error } = await supabase
        .from('plants')
        .insert({
          ...plantData,
          image_url: imageUrl,
          user_id: user.id,
        })
        .select('*')
        .single();
        
      if (error) throw error;
      return data as Plant;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants', user?.id] });
      toast({
        title: 'Plant added',
        description: 'Your new plant has been added successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding plant',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update a plant
  const updatePlantMutation = useMutation({
    mutationFn: async ({ id, plantData }: { 
      id: number, 
      plantData: Partial<Omit<Database['public']['Tables']['plants']['Update'], 'user_id'>> & { image?: File } 
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      let updateData: Partial<Database['public']['Tables']['plants']['Update']> = { ...plantData };
      delete (updateData as any).image;
      
      // Upload new image if provided
      if (plantData.image) {
        const imageUrl = await uploadPlantImage(plantData.image);
        if (imageUrl) {
          updateData.image_url = imageUrl;
        }
      }
      
      const { data, error } = await supabase
        .from('plants')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .single();
        
      if (error) throw error;
      return data as Plant;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['plants', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['plant', data.id] });
      toast({
        title: 'Plant updated',
        description: 'Your plant has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating plant',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete a plant
  const deletePlantMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('plants')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['plants', user?.id] });
      toast({
        title: 'Plant deleted',
        description: 'The plant has been removed from your collection.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting plant',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    plants,
    isLoading,
    uploading,
    getPlant,
    addPlant: addPlantMutation.mutate,
    updatePlant: updatePlantMutation.mutate,
    deletePlant: deletePlantMutation.mutate,
  };
};
