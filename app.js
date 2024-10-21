const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authenticate = require('./middleware/authenticate'); // Ensure you import your middleware
const cors = require('cors');

const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/task-management')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err));

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Allow credentials if needed (e.g., cookies, authorization headers)
}));
    
// Routes
app.use('/api/user', userRoutes);
app.use('/api', listRoutes);
app.use('/api', taskRoutes);

// Test route to check authentication middleware
app.get('/api/test', authenticate, (req, res) => {
    res.json({ userId: req.userId });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
