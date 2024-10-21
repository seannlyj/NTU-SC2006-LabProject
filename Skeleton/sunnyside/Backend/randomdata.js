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

    const activities = [
      {
        lat: 1.3415,
        long: 103.6760,
        name: "Track Running Course",
        popUp: "Track",
        description: "An outdoor track perfect for long-distance running with open skies and fresh air.",
        sport: "Running",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3392,
        long: 103.6740,
        name: "Indoor Treadmill Center",
        popUp: "Gym",
        description: "A climate-controlled gym offering advanced treadmills for running indoors all year round.",
        sport: "Running",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3420,
        long: 103.6785,
        name: "Outdoor Swimming Pool",
        popUp: "Pool",
        description: "Enjoy a refreshing swim in this large outdoor pool, ideal for laps under the sun.",
        sport: "Swimming",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3385,
        long: 103.6772,
        name: "Indoor Aquatic Center",
        popUp: "Aquatic Center",
        description: "An indoor facility offering temperature-controlled pools perfect for swimming during any season.",
        sport: "Swimming",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3431,
        long: 103.6730,
        name: "Mountain Hiking Trail",
        popUp: "Trail",
        description: "Explore this scenic outdoor trail through forests and hills, perfect for hiking enthusiasts.",
        sport: "Hiking",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3379,
        long: 103.6768,
        name: "Indoor Hiking Simulator",
        popUp: "Simulator",
        description: "Experience the challenge of hiking indoors with this advanced hiking simulator.",
        sport: "Hiking",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3419,
        long: 103.6754,
        name: "Cycling Track",
        popUp: "Track",
        description: "Ride through smooth outdoor cycling tracks designed for both casual and competitive cyclists.",
        sport: "Cycling",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3397,
        long: 103.6770,
        name: "Indoor Spin Class",
        popUp: "Gym",
        description: "Join a high-energy spin class indoors with music to keep you motivated.",
        sport: "Cycling",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3428,
        long: 103.6745,
        name: "Yoga by the Park",
        popUp: "Park",
        description: "Unwind with outdoor yoga sessions in this serene park, surrounded by nature.",
        sport: "Yoga",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3394,
        long: 103.6758,
        name: "Yoga Studio",
        popUp: "Studio",
        description: "Find your inner peace with indoor yoga classes in this calming studio environment.",
        sport: "Yoga",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3417,
        long: 103.6749,
        name: "Bouldering Wall",
        popUp: "Climbing Wall",
        description: "Challenge yourself on this outdoor bouldering wall designed for all levels.",
        sport: "Bouldering",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3403,
        long: 103.6764,
        name: "Indoor Bouldering Gym",
        popUp: "Climbing Gym",
        description: "Test your skills on varied climbing routes in this indoor bouldering gym.",
        sport: "Bouldering",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3424,
        long: 103.6759,
        name: "Boxing Gym",
        popUp: "Gym",
        description: "Train like a pro at this indoor boxing gym equipped with all the essentials for martial arts training.",
        sport: "Martial Arts",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3382,
        long: 103.6738,
        name: "Outdoor Karate Dojo",
        popUp: "Dojo",
        description: "Practice martial arts in an outdoor setting with fresh air and plenty of space.",
        sport: "Martial Arts",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3430,
        long: 103.6741,
        name: "Community Soccer Field",
        popUp: "Field",
        description: "Join friends for a game of soccer on this spacious outdoor field.",
        sport: "Soccer",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3408,
        long: 103.6769,
        name: "Indoor Soccer Court",
        popUp: "Court",
        description: "Play soccer indoors in this well-maintained court, ideal for any weather.",
        sport: "Soccer",
        indoorOutdoor: "indoor",
        rating: 3
      },
      {
        lat: 1.3429,
        long: 103.6747,
        name: "Basketball Court",
        popUp: "Court",
        description: "Enjoy a game of basketball outdoors on this well-maintained court with ample space.",
        sport: "Basketball",
        indoorOutdoor: "outdoor",
        rating: 3
      },
      {
        lat: 1.3411,
        long: 103.6752,
        name: "Indoor Basketball Arena",
        popUp: "Arena",
        description: "Play basketball indoors in this large arena with top-quality equipment and lighting.",
        sport: "Basketball",
        indoorOutdoor: "indoor",
        rating: 3
      }
    ];
    const users = [
        {firstname: "first1", lastname: "last1", email: "email1", password: "password1", preference1: "pref1", preference2: "pref2", preference3: "pref3", activitylog: [{activityName: "activity1", date: "2021-01-01", time: "12:00"}]},
    ]

    await User.insertMany(users);
    await Activity.insertMany(activities);
    console.log('Data seeded successfully');
    mongoose.connection.close(); // Close the connection after seeding
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
