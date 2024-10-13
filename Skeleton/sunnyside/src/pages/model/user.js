const mongoose = require('mongoose');

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
        required: true
    }
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

module.exports = mongoose.model('User', UserSchema);

