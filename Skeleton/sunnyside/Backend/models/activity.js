const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    lat:{
        type: String,
        required: true
    },
    long:{
        type: String,
        required: true
    }
});

// this function checks if the activity already exists, based on the Lat Long
// returns true if the activity exists, false otherwise
ActivitySchema.statics.doesActivityExist = async function(activityLat, activityLong){
    if(!activityLat || !activityLong){
        throw new Error("Invalid Lat Long");
    }
    try{
        const activity = await this.findOne({lat: activityLat, long:activityLong})
        if(activity){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('Error checking if activity exists:', error.message);
        return true;
    }
}

module.exports = mongoose.model('Activity', ActivitySchema);