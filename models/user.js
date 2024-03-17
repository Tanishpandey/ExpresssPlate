const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    streetAddress: String, // Add streetAddress field
    zipcode: String, // Add zipcode field
    isCompany: {
        type: Boolean,
        default: false // Default value for isCompany
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
