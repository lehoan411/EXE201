const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: String,
    phone: String,
    role: {
        type: String,
        default: 'user',
    },
    status: {
        type: String,
        default: 'active',
    },
});

module.exports = mongoose.model('Account', AccountSchema);
