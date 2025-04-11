import React from 'react';
import { useForm } from 'react-hook-form';
import { Event, EventFormData } from '../types/Event';

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventFormData) => void;
  isSubmitting: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>({
    defaultValues: event ? {
      name: event.name,
      description: event.description || '',
      from: event.from.substring(0, 16),
      to: event.to.substring(0, 16)
    } : {
      name: '',
      description: '',
      from: '',
      to: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Event Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          {...register('name', { required: 'Event name is required' })}
        />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description (optional)</label>
        <textarea
          className="form-control"
          id="description"
          rows={3}
          {...register('description')}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="from" className="form-label">Start Date and Time</label>
        <input
          type="datetime-local"
          className={`form-control ${errors.from ? 'is-invalid' : ''}`}
          id="from"
          {...register('from', { required: 'Start date is required' })}
        />
        {errors.from && <div className="invalid-feedback">{errors.from.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="to" className="form-label">End Date and Time</label>
        <input
          type="datetime-local"
          className={`form-control ${errors.to ? 'is-invalid' : ''}`}
          id="to"
          {...register('to', { required: 'End date is required' })}
        />
        {errors.to && <div className="invalid-feedback">{errors.to.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Saving...
          </>
        ) : (
          'Save Event'
        )}
      </button>
    </form>
  );
};

export default EventForm;