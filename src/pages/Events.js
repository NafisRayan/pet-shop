import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Events = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    // TODO: Fetch approved events
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement event submission logic
      toast.success('Event submitted for approval!');
      setFormData({
        title: '',
        description: '',
        date: '',
        location: ''
      });
    } catch (error) {
      toast.error('Failed to submit event');
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
      <h1 className="text-3xl font-bold mb-8">Pet Events</h1>

      {/* Create Event Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create an Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Event title"
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
              placeholder="Event description"
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Date</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
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
              placeholder="Event location"
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

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Organizer:</span>{' '}
                  {event.organizer.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No events scheduled yet.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
