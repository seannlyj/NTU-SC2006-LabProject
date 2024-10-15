const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Get a specific user based on email
router.get('/:email', async(req, res) => {
    console.log("I am in get");
    try{
        const user = await User.find({"email": req.params.email});
        if(!user){
            // return res.status(404).json({message: 'User not found'});
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
    console.log("I am in post");
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

// Update a user's info
// PATCH, allows us to partially update a specific item based on a certain identifier
// To update specific fields of the user, inside the URL we do firstname:
router.patch('/:email', async(req, res) => {
    try{
        // find this user based on their email
        const user = await User.findOne({email: req.params.email}); 
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        // if the request body has a firstname, update the user's first name
        if(req.body.firstname){
            user.firstname = req.body.firstname;
        }

        // if the request body has a lastname, update the user's last name
        if(req.body.lastname){
            user.lastname = req.body.lastname;
        }

        // if the request body has an email, update the user's email
        if(req.body.email){
            user.email = req.body.email;
        }
        // if(req.body.password){
        //     user.password = req.body.password;
        // }

        // if the request body has preferences, update the user's preferences
        if(req.body.preferences){
            user.preference1 = req.body.preferences[0];
            user.preference2 = req.body.preferences[1];
            user.preference3 = req.body.preferences[2];
        }
        
        if(req.body.activitylog){
            user.activitylog.push(req.body.activitylog);
        }
        
        // Mongoose knows that we changed an existing user
        // So it will convert this save() function call into an updateOne() function call
        const updatedUser = await user.save();
        res.status(200).json(updatedUser); // Status 200 to repsent OK
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;