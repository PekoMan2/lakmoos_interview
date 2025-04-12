import axios from 'axios';
import { Event, EventFormData } from '../types/Event';
import process from 'process';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/events';

export const api = {
  // Get all events
  getEvents: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  },

  // Search events
  searchEvents: async (params: { name?: string; from?: string; to?: string }): Promise<Event[]> => {
    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  },

  // Create a new event
  createEvent: async (event: EventFormData): Promise<Event> => {
    const response = await axios.post(API_URL, event);
    return response.data;
  },

  // Update an event
  updateEvent: async (id: string, event: EventFormData): Promise<Event> => {
    const response = await axios.put(`${API_URL}/${id}`, event);
    return response.data;
  },

  // Delete an event
  deleteEvent: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};