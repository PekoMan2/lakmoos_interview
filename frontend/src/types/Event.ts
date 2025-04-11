export interface Event {
    id: string;
    name: string;
    description?: string;
    from: string;
    to: string;
  }
  
export interface EventFormData {
    name: string;
    description: string;
    from: string;
    to: string;
}
