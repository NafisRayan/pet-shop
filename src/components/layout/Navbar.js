import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              PetShop
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/pets" className="text-gray-700 hover:text-primary">
              Find Pets
            </Link>
            <Link to="/add-pet" className="bg-primary text-white px-4 py-2 rounded-md">
              Add Pet
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 