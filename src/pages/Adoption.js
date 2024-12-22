import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Adoption = () => {
  const { currentUser } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch available pets for adoption
    setLoading(false);
  }, []);

  const handleAdoptRequest = async (petId) => {
    try {
      // TODO: Implement adoption request logic
      toast.success('Adoption request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit adoption request');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pet Adoption</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map(pet => (
          <div key={pet._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {pet.images && pet.images[0] && (
              <img
                src={pet.images[0]}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
              <p className="text-gray-600 mb-2">{pet.breed}</p>
              <p className="text-gray-500 mb-4">{pet.age} years old</p>
              <p className="mb-4">{pet.description}</p>
              <button
                onClick={() => handleAdoptRequest(pet._id)}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
              >
                Request Adoption
              </button>
            </div>
          </div>
        ))}
      </div>

      {pets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No pets available for adoption at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Adoption;
