import React from 'react';
import { Event, EventFormData } from '../types/Event';
import EventForm from './EventForm';

interface EventModalProps {
  show: boolean;
  event?: Event;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
  isSubmitting: boolean;
  title: string;
}

const EventModal: React.FC<EventModalProps> = ({ 
  show, 
  event, 
  onClose, 
  onSubmit, 
  isSubmitting,
  title
}) => {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <EventForm 
                event={event} 
                onSubmit={onSubmit} 
                isSubmitting={isSubmitting} 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default EventModal;