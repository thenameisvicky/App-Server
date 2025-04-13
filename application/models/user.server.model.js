const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vehiclesOwned: [
        {
            vin: { type: String, required: true, unique: true },
            make: { type: String, required: true },
            model: { type: String, required: true },
            location: { type: String },
            speed: { type: Number },
            status: { type: String, default: 'active' }
        }
    ]
});

module.exports = mongoose.model('User', userSchema, 'userdetails');