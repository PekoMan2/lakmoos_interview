import React from 'react';
import { Event } from '../types/Event';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        {event.description && <p className="card-text">{event.description}</p>}
        <div className="mb-2">
          <strong>From:</strong> {formatDate(event.from)}
        </div>
        <div className="mb-3">
          <strong>To:</strong> {formatDate(event.to)}
        </div>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-primary btn-sm" 
            onClick={() => onEdit(event)}
          >
            Edit
          </button>
          <button 
            className="btn btn-outline-danger btn-sm" 
            onClick={() => onDelete(event.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;