import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Event, EventFormData } from '../types/Event';

export const useEvents = () => {
  const queryClient = useQueryClient();

  const eventsQuery = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: api.getEvents
  });

  const useSearchEvents = (searchParams: { name?: string; from?: string; to?: string }) => {
    return useQuery<Event[]>({
      queryKey: ['events', 'search', searchParams],
      queryFn: () => api.searchEvents(searchParams),
      enabled: !!searchParams.name || !!searchParams.from || !!searchParams.to
    });
  };

  const createEventMutation = useMutation({
    mutationFn: (newEvent: EventFormData) => api.createEvent(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, event }: { id: string; event: EventFormData }) => 
      api.updateEvent(id, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => api.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  return {
    eventsQuery,
    useSearchEvents,
    createEventMutation,
    updateEventMutation,
    deleteEventMutation
  };
};