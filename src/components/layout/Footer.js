import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PetShop</h3>
            <p className="text-gray-300">
              Finding forever homes for our furry friends.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Adoption</h3>
            <ul className="space-y-2">
              <li><Link to="/pets" className="text-gray-300 hover:text-white">Available Pets</Link></li>
              <li><Link to="/adoption" className="text-gray-300 hover:text-white">Adoption Process</Link></li>
              <li><Link to="/lost-found" className="text-gray-300 hover:text-white">Lost & Found</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white">Events</Link></li>
              <li><Link to="/pet-rescue" className="text-gray-300 hover:text-white">Pet Rescue</Link></li>
              <li><Link to="/vet-search" className="text-gray-300 hover:text-white">Find a Vet</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: info@petshop.com<br />
              Phone: (123) 456-7890<br />
              Address: 123 Pet Street<br />
              City, State 12345
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300"> 2024 PetShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;