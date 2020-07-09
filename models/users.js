const mongoose = require('mongoose'); 
const journeyModel = require('./journey');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email_address: String,
    password: String,
    journeys: [{type: mongoose.Schema.Types.ObjectId, ref: 'journey'}]
});

module.exports = mongoose.model('users', userSchema);