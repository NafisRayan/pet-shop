import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('adoptions');
  const [adoptions, setAdoptions] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [vets, setVets] = useState([]);

  useEffect(() => {
    // TODO: Fetch data based on active tab
  }, [activeTab]);

  const handleApproval = async (type, id, status) => {
    try {
      // TODO: Implement approval logic
      toast.success(`${type} ${status} successfully!`);
    } catch (error) {
      toast.error(`Failed to ${status} ${type}`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'adoptions':
        return (
          <div className="space-y-4">
            {adoptions.map(adoption => (
              <div key={adoption._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">Pet: {adoption.pet.name}</h3>
                <p>Applicant: {adoption.applicant.name}</p>
                <p>Status: {adoption.status}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleApproval('adoption', adoption._id, 'approve')}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval('adoption', adoption._id, 'reject')}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'blog':
        return (
          <div className="space-y-4">
            {blogPosts.map(post => (
              <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">By: {post.author.name}</p>
                <p className="mt-2">{post.content.substring(0, 150)}...</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleApproval('blog', post._id, 'approve')}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval('blog', post._id, 'reject')}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'events':
        return (
          <div className="space-y-4">
            {events.map(event => (
              <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">{event.title}</h3>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleApproval('event', event._id, 'approve')}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval('event', event._id, 'reject')}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'vets':
        return (
          <div className="space-y-4">
            {vets.map(vet => (
              <div key={vet._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">{vet.name}</h3>
                <p>Specialization: {vet.specialization}</p>
                <p>Location: {vet.location}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleApproval('vet', vet._id, 'approve')}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval('vet', vet._id, 'reject')}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('adoptions')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'adoptions'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Adoptions
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'blog'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Blog Posts
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'events'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab('vets')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'vets'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Veterinarians
        </button>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default AdminPanel;
