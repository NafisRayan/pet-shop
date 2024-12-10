import { useState } from 'react';

function SearchFilters({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    species: '',
    age: '',
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by name or species..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <select
            name="species"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filters.species}
            onChange={handleFilterChange}
          >
            <option value="">All Species</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="bird">Birds</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <select
            name="age"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filters.age}
            onChange={handleFilterChange}
          >
            <option value="">All Ages</option>
            <option value="baby">Baby</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters; 