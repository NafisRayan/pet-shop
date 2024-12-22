import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const VetSearch = () => {
  const { currentUser } = useAuth();
  const [vets, setVets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    location: '',
    contact: ''
  });

  useEffect(() => {
    // TODO: Fetch approved vets
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement vet submission logic
      toast.success('Vet details submitted for approval!');
      setFormData({
        name: '',
        specialization: '',
        location: '',
        contact: ''
      });
    } catch (error) {
      toast.error('Failed to submit vet details');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const filteredVets = vets.filter(vet =>
    vet.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Veterinarian</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by location or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Add Vet Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add a Veterinarian</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Vet's full name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="E.g., Small Animals, Exotic Pets, etc."
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Clinic address"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Phone number or email"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
          >
            Submit for Approval
          </button>
        </form>
      </div>

      {/* Vets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVets.map(vet => (
          <div key={vet._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{vet.name}</h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Specialization:</span> {vet.specialization}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Location:</span> {vet.location}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Contact:</span> {vet.contact}
            </p>
          </div>
        ))}
      </div>

      {filteredVets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No veterinarians found.</p>
        </div>
      )}
    </div>
  );
};

export default VetSearch;
