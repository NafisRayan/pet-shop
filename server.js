const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/services/mongodb');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/pets', require('./src/routes/pets'));
app.use('/api/adoptions', require('./src/routes/adoptions'));
app.use('/api/lost-found', require('./src/routes/lostFound'));
app.use('/api/blog', require('./src/routes/blog'));
app.use('/api/vets', require('./src/routes/vets'));
app.use('/api/events', require('./src/routes/events'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
