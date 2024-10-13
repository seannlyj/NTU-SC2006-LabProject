const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// Add a new user to the DB
router.post('/', async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    // Check if the user already exists
    const userExists = await User.doesUserExist(user.email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = await user.save();
    res.status(201).json(newUser); // status 201 means created
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific user
router.get('/:email', async(req, res) => {
    try{
        const user = await User.findOne({email: req.params.email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
        // user is a JSON object, so can just return it without any conversion
        return user; // not sure if can just return like this
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

// Add a new user to the DB
router.post('/', async(req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    try{
        // before we add a new user, we should check if the user already exists
        const userExists = await User.doesUserExist(user.email);
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser = await user.save();
        res.status(201).json(newUser); // status 201 means created
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;