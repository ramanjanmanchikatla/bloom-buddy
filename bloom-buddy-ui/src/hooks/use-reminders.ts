
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/lib/database.types';

type Reminder = Database['public']['Tables']['reminders']['Row'];

export const useReminders = (plantId?: number) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get all reminders for current user, optionally filtered by plant ID
  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['reminders', user?.id, plantId],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id);
        
      if (plantId) {
        query = query.eq('plant_id', plantId);
      }
      
      const { data, error } = await query.order('due_date', { ascending: true });
        
      if (error) {
        toast({
          title: 'Error fetching reminders',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as Reminder[];
    },
    enabled: !!user,
  });

  // Add a new reminder
  const addReminderMutation = useMutation({
    mutationFn: async (reminderData: Omit<Database['public']['Tables']['reminders']['Insert'], 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('reminders')
        .insert({
          ...reminderData,
          user_id: user.id,
          is_completed: false,
        })
        .select('*')
        .single();
        
      if (error) throw error;
      return data as Reminder;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reminders', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['reminders', user?.id, data.plant_id] });
      toast({
        title: 'Reminder added',
        description: 'Your new reminder has been set.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding reminder',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update a reminder (e.g., mark as completed)
  const updateReminderMutation = useMutation({
    mutationFn: async ({ id, reminderData }: { 
      id: number, 
      reminderData: Partial<Database['public']['Tables']['reminders']['Update']> 
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('reminders')
        .update(reminderData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .single();
        
      if (error) throw error;
      return data as Reminder;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reminders', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['reminders', user?.id, data.plant_id] });
      toast({
        title: 'Reminder updated',
        description: 'Your reminder has been updated.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating reminder',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete a reminder
  const deleteReminderMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders', user?.id] });
      if (plantId) {
        queryClient.invalidateQueries({ queryKey: ['reminders', user?.id, plantId] });
      }
      toast({
        title: 'Reminder deleted',
        description: 'The reminder has been removed.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting reminder',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    reminders,
    isLoading,
    addReminder: addReminderMutation.mutate,
    updateReminder: updateReminderMutation.mutate,
    deleteReminder: deleteReminderMutation.mutate,
  };
};
