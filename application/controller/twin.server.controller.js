const Twin = require('../models/twin.server.model');
const Vehicle = require('../models/vehicle.server.model');
const { sendThreatAlert } = require('../websocket/socket');

exports.createTwin = async (vehicle_id, details) => {

    try {

        const vehicle = await Vehicle.findById(vehicle_id);
        if (!vehicle) {
            console.log(`Attempt to track a non-existent vehicle: ${vehicle_id}`);
            return;
        }

        const newTwin = new DigitalTwin({
            user_id,
            vehicle_id,
            is_honeypot: true,
            status: "active"
        });
        await newTwin.save();

        sendThreatAlert(vehicle_id, details);

     console.log(`Honeypot Digital Twin created for Vehicle ${vehicle_id} by User ${user_id}`);

    } catch (error) {

        console.error(`Twin Creation Error: ${error.message}`);
        res.status(500).json({ msg: error.message });

    };

};

exports.getUserTwins = async (req, res) => {

    try {

        const user_id = req.user.id;
        const userTwins = await Twin.find({ user_id }).populate('vehicle_id');

        res.json({ userTwins });

    } catch (error) {

        console.error(`Fetch Twin Error: ${error.message}`);
        res.status(500).json({ msg: error.nessage });

    }

};