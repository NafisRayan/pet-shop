import { useState } from 'react';
import SearchFilters from '../components/pets/SearchFilters';
import PetCard from '../components/pets/PetCard';

// Temporary mock data
const mockPets = [
  {
    id: 1,
    name: "Max",
    species: "dog",
    breed: "Golden Retriever",
    age: "young",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Max is a friendly and energetic Golden Retriever who loves to play fetch."
  },
  // Add more mock pets...
];

function PetListing() {
  const [pets, setPets] = useState(mockPets);
  const [filteredPets, setFilteredPets] = useState(mockPets);

  const handleSearch = (searchTerm) => {
    const filtered = pets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPets(filtered);
  };

  const handleFilter = (filters) => {
    let filtered = [...pets];
    
    if (filters.species) {
      filtered = filtered.filter(pet => pet.species === filters.species);
    }
    
    if (filters.age) {
      filtered = filtered.filter(pet => pet.age === filters.age);
    }
    
    setFilteredPets(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Pets</h1>
      
      <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      
      {filteredPets.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No pets found matching your criteria.
        </div>
      )}
    </div>
  );
}

export default PetListing; 