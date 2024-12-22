import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

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
            <Link to="/lost-found" className="text-gray-700 hover:text-primary">
              Lost & Found
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary">
              Blog
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-primary">
              Events
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                  Dashboard
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;