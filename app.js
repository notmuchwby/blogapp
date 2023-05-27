const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Create the Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/welbex/user', userRoutes);
app.use('/welbex/post', postRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));