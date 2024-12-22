import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userPets, setUserPets] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // TODO: Fetch user's pets, adoption requests, and favorites
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {currentUser?.name}</p>
            <p><span className="font-medium">Email:</span> {currentUser?.email}</p>
          </div>
        </div>

        {/* My Pets Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Pets</h2>
          {userPets.length > 0 ? (
            <ul className="space-y-2">
              {userPets.map(pet => (
                <li key={pet._id} className="border-b pb-2">
                  {pet.name} - {pet.type}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No pets listed yet</p>
          )}
        </div>

        {/* Adoption Requests Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Adoption Requests</h2>
          {adoptionRequests.length > 0 ? (
            <ul className="space-y-2">
              {adoptionRequests.map(request => (
                <li key={request._id} className="border-b pb-2">
                  {request.pet.name} - {request.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No adoption requests yet</p>
          )}
        </div>

        {/* Favorites Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Favorites</h2>
          {favorites.length > 0 ? (
            <ul className="space-y-2">
              {favorites.map(pet => (
                <li key={pet._id} className="border-b pb-2">
                  {pet.name} - {pet.type}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No favorites added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
