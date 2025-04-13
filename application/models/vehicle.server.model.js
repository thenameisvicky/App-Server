const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    email: { type: String, required: true },
    vin: { type: String, required: true, unique: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    location: { type: String },
    speed: { type: Number },
    status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
