import { Link } from 'react-router-dom';

function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={pet.imageUrl} 
        alt={pet.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
        <div className="text-gray-600 mb-2">
          <span className="mr-2">{pet.species}</span>
          <span>•</span>
          <span className="ml-2">{pet.age}</span>
        </div>
        <p className="text-gray-500 mb-4 line-clamp-2">{pet.description}</p>
        <Link
          to={`/pets/${pet.id}`}
          className="block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PetCard; 