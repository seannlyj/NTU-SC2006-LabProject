const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.log(err));

// Routes
const activtyRoutes = require('./routes/activities');
const userRoutes = require('./routes/users');
app.use('/api/activities', activtyRoutes);
app.use('/api/users', userRoutes);

// test route
app.get('/', (req, res) => {
  res.send('App is running');
});

app.get('/api/users', (req, res) => {
  res.send('Users route');
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});