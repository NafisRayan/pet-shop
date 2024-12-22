import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LostFound = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    type: 'lost',
    petType: '',
    description: '',
    location: '',
    images: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement post submission logic
      toast.success('Post submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit post');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Lost & Found Pets</h1>

      {/* Submit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Submit a Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="lost">Lost Pet</option>
              <option value="found">Found Pet</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Pet Type</label>
            <input
              type="text"
              name="petType"
              value={formData.petType}
              onChange={handleInputChange}
              placeholder="Dog, Cat, etc."
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the pet..."
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>

          <div>
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Where was the pet lost/found?"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.images && post.images[0] && (
              <img
                src={post.images[0]}
                alt="Pet"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className={`inline-block px-2 py-1 rounded-full text-sm text-white mb-2 ${
                post.type === 'lost' ? 'bg-red-500' : 'bg-green-500'
              }`}>
                {post.type === 'lost' ? 'Lost' : 'Found'}
              </div>
              <p className="text-gray-600 mb-2">{post.petType}</p>
              <p className="mb-2">{post.description}</p>
              <p className="text-gray-500">Location: {post.location}</p>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No lost & found posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default LostFound;
