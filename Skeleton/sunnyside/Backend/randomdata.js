const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Activity = require('./models/activity');
const User = require('./models/user');

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  seedData(); // Call the function to seed data
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Seed data function
const seedData = async () => {
  try {
    // const activities = [
    //   { name: 'Activity 1', description: 'Description for Activity 1', rating: 1, lat: "lat1", long: "long1" },
    //   { name: 'Activity 2', description: 'Description for Activity 2', rating: 2, lat: "lat2", long: "long2" },
    //   { name: 'Activity 3', description: 'Description for Activity 3', rating: 3, lat: "lat3", long: "long3" }
    // ];
    const users = [
        {firstname: "first1", lastname: "last1", email: "email1", password: "password1", preference1: "pref1", preference2: "pref2", preference3: "pref3", activitylog: [{activityName: "activity1", date: "2021-01-01", time: "12:00"}]},
    ]

    await User.insertMany(users);
    console.log('Data seeded successfully');
    mongoose.connection.close(); // Close the connection after seeding
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
