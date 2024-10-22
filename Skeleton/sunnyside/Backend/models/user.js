const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    preference1: {
        type: String,
        required: false,
        default: 'None'
    },
    preference2: {
        type: String,
        required: false,
        default: 'None'
    },
    preference3: {
        type: String,
        required: false,
        default: 'None'
    },
    activitylog:[{
        activityName:{
            type: String,
            required: true
        },
        date:{
            type: String,
            required: true
        },
        time:{
            type: String,
        }
    }]
});

UserSchema.statics.doesUserExist = async function(userEmail){
    if(!userEmail){
        throw new Error("Invalid email");
    }
    try{
        const user = await this.findOne({email: userEmail})
        if(user){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('Error checking if user exists:', error.message);
        return true;
    }
}

// This function is ran before the Save() function is called, it hashes the password before saving it into the database
UserSchema.pre('save', async function(next){
    // If the password was not modified, we do not need to update it
    if(!this.isModified('password')){
        return next();
    }
    // If the password was modified, we need to hash the new password before we save it into the database
    this.password = await bcrpyt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);

