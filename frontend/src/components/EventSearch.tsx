// src/components/EventSearch.tsx
import React, { useState } from 'react';

interface SearchParams {
  name?: string;
  from?: string;
  to?: string;
}

interface EventSearchProps {
  onSearch: (params: SearchParams) => void;
}

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: '',
    from: '',
    to: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty values
    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== '')
    );
    onSearch(filteredParams);
  };

  const handleReset = () => {
    setSearchParams({ name: '', from: '', to: '' });
    onSearch({});
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Search Events</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="nameSearch" className="form-label">Event Name</label>
              <input
                type="text"
                className="form-control"
                id="nameSearch"
                name="name"
                value={searchParams.name}
                onChange={handleChange}
                placeholder="Search by name"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="fromSearch" className="form-label">From Date</label>
              <input
                type="datetime-local"
                className="form-control"
                id="fromSearch"
                name="from"
                value={searchParams.from}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="toSearch" className="form-label">To Date</label>
              <input
                type="datetime-local"
                className="form-control"
                id="toSearch"
                name="to"
                value={searchParams.to}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary">Search</button>
            <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventSearch;