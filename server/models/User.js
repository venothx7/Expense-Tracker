const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creating User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = User = mongoose.model('user', UserSchema, 'users');