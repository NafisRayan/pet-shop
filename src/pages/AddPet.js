import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddPet() {
  const history = useHistory();
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    description: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPetData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Pet Data:', petData);
    history.push('/pets');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add a New Pet</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Pet Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={petData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Species</label>
          <select
            name="species"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={petData.species}
            onChange={handleChange}
          >
            <option value="">Select Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Breed</label>
          <input
            type="text"
            name="breed"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={petData.breed}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Age</label>
          <select
            name="age"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={petData.age}
            onChange={handleChange}
          >
            <option value="">Select Age</option>
            <option value="baby">Baby</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={petData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
        >
          Add Pet
        </button>
      </form>
    </div>
  );
}

export default AddPet; 