const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  createdAt: { type: Date, default: Date.now }
});

// Pet Schema
const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: String,
  age: Number,
  description: String,
  images: [String],
  status: { type: String, enum: ['available', 'adopted', 'pending'], default: 'available' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

// Adoption Schema
const adoptionSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  applicationDate: { type: Date, default: Date.now }
});

// Lost & Found Schema
const lostFoundSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  petType: { type: String, required: true },
  description: String,
  location: String,
  images: [String],
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

// Blog Post Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Vet Schema
const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  location: { type: String, required: true },
  contact: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Event Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Pet = mongoose.model('Pet', petSchema);
const Adoption = mongoose.model('Adoption', adoptionSchema);
const LostFound = mongoose.model('LostFound', lostFoundSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Vet = mongoose.model('Vet', vetSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = {
  connectDB,
  User,
  Pet,
  Adoption,
  LostFound,
  Blog,
  Vet,
  Event
};
