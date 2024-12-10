import { Link } from 'react-router-dom';
import PawLogo from '../components/shared/PawLogo';

function Home() {
  return (
    <div className="min-h-screen bg-pink-200">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="text-primary">
              <PawLogo />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            SAFE HEAVEN PAWS
          </h1>
          <h2 className="text-3xl text-gray-700 mb-12">
            Rescue.Care.Connect
          </h2>
          <div className="flex justify-center space-x-6">
            <Link
              to="/pets"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition duration-300"
            >
              Find a Pet
            </Link>
            <Link
              to="/add-pet"
              className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition duration-300"
            >
              Add a Pet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 