const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
name:{
    type: String,
    required: true
},

email:{
    type: String,
    required: true,
    unique: true
},
password:{
    type: String,
    required: true
},
//gravatar helps us to add an profile image to an email
avatar:{
    type: String
},
date: {
    type: Date,
    default: Date.now
}

})

module.exports = User = mongoose.model('user', UserSchema)