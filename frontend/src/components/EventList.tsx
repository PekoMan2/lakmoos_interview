import React from 'react';
import { Event } from '../types/Event';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, isLoading, error, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading events: {error.message}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No events found. Create your first event!
      </div>
    );
  }

  return (
    <div className="row">
      {events.map(event => (
        <div className="col-md-6 col-lg-4" key={event.id}>
          <EventCard
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default EventList;