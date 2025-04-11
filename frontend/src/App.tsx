// src/App.tsx
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEvents } from './hooks/useEvents';
import EventList from './components/EventList';
import EventSearch from './components/EventSearch';
import EventModal from './components/EventModal';
import { Event, EventFormData } from './types/Event';

const queryClient = new QueryClient();

const EventsManager: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{name?: string; from?: string; to?: string}>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  
  const { 
    eventsQuery, 
    useSearchEvents,
    createEventMutation, 
    updateEventMutation, 
    deleteEventMutation 
  } = useEvents();

  const searchQuery = useSearchEvents(searchParams);
  const { data: events = [], isLoading, error } = 
    Object.keys(searchParams).length > 0 ? searchQuery : eventsQuery;

  const handleCreateEvent = () => {
    setSelectedEvent(undefined);
    setShowModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEventMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const handleSubmit = async (data: EventFormData) => {
    try {
      if (selectedEvent) {
        await updateEventMutation.mutateAsync({ id: selectedEvent.id, event: data });
      } else {
        await createEventMutation.mutateAsync(data);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleSearch = (params: {name?: string; from?: string; to?: string}) => {
    setSearchParams(params);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Event Manager</h1>
        <button className="btn btn-primary" onClick={handleCreateEvent}>
          Create Event
        </button>
      </div>

      <EventSearch onSearch={handleSearch} />

      <EventList
        events={events}
        isLoading={isLoading}
        error={error as Error}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <EventModal
        show={showModal}
        event={selectedEvent}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        isSubmitting={createEventMutation.isPending || updateEventMutation.isPending}
        title={selectedEvent ? 'Edit Event' : 'Create Event'}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EventsManager />
    </QueryClientProvider>
  );
};

export default App;