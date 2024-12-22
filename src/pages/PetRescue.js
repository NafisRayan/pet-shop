import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PetRescue = () => {
  const { currentUser } = useAuth();
  const [rescueCases, setRescueCases] = useState([]);
  const [formData, setFormData] = useState({
    petType: '',
    location: '',
    description: '',
    urgency: 'medium',
    images: []
  });

  useEffect(() => {
    // TODO: Fetch rescue cases
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement rescue case submission
      toast.success('Rescue case submitted successfully!');
      setFormData({
        petType: '',
        location: '',
        description: '',
        urgency: 'medium',
        images: []
      });
    } catch (error) {
      toast.error('Failed to submit rescue case');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusUpdate = async (caseId, newStatus) => {
    try {
      // TODO: Implement status update logic
      toast.success('Status updated successfully!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pet Rescue</h1>

      {/* Submit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Report a Pet in Need</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Pet Type</label>
            <input
              type="text"
              name="petType"
              value={formData.petType}
              onChange={handleInputChange}
              placeholder="Dog, Cat, etc."
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
              placeholder="Where is the pet located?"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the situation..."
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Urgency Level</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
          >
            Submit Case
          </button>
        </form>
      </div>

      {/* Rescue Cases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rescueCases.map(case_ => (
          <div key={case_._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {case_.images && case_.images[0] && (
              <img
                src={case_.images[0]}
                alt="Pet"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className={`inline-block px-2 py-1 rounded-full text-sm text-white mb-2 ${
                case_.urgency === 'high'
                  ? 'bg-red-500'
                  : case_.urgency === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}>
                {case_.urgency.charAt(0).toUpperCase() + case_.urgency.slice(1)} Priority
              </div>
              <p className="text-gray-600 mb-2">{case_.petType}</p>
              <p className="mb-2">{case_.description}</p>
              <p className="text-gray-500 mb-4">Location: {case_.location}</p>
              
              {currentUser && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(case_._id, 'in_progress')}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Mark In Progress
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(case_._id, 'resolved')}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {rescueCases.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No rescue cases reported yet.</p>
        </div>
      )}
    </div>
  );
};

export default PetRescue;
