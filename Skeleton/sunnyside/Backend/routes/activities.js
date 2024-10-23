const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');

// Get all activities
router.get('/', async(req, res) => {
    try{
        const activities = await Activity.find();
        res.json(activities);
        return activities;
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

// Get a specific activity based on its name
router.get('/:name', async(req, res) => {
    try{
        const activity = await Activity.findOne({name: req.params.name});
        if(!activity){
            return res.json({message: 'Activity not found'});
        }
        //res.json(activity);
        return res.status(200).json(activity);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

// POST a new activity (add activity to DB)
router.post('/', async(req, res) => {
    const activity = new Activity({
        name: req.body.name,
        description: req.body.description,
        rating: req.body.rating,
        lat: req.body.lat,
        long: req.body.long,
        popUp: req.body.popUp,
        indoorOutdoor: req.body.indoorOutdoor,
        sport: req.body.sport
    });
    // this works to get an array of preferences
    // const prefs = req.body.preference;
    // console.log(prefs);
    try{
        // before we add a new activity, we should check if it already exists
        const activityExists = await Activity.doesActivityExist(activity.lat, activity.long);
        if(activityExists){
            return res.status(400).json({message: 'Activity already exists'});
        }

        const newActivity = await activity.save();
        res.status(201).json(newActivity); // status 201 means created
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

// PATCH Route, to update the details of an existing activity
router.patch('/', async(req, res) => {
    try{
        // find this activity based on the lat long
        const activity = await Activity.findOne({lat: req.body.lat, long: req.body.long});

        console.log('Activity is', activity);

        if(!activity){
            return res.status(404).json({message: 'Activity not found'});
        }

        // if the request body contains a rating, update the activities rating to be a average
        if(req.body.rating){
            activity.rating = req.body.rating;
        }

        // Mongoose knows that we changed an existing activity
        // So it will convert the save() function call into an update
        const updatedActivity = await activity.save();
        res.status(200).json(updatedActivity);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})

module.exports = router;