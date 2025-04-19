const Vehicle = require('../models/vehicle.server.model');
const { createTwin } = require('./twin.server.handler');

exports.addVehicle = async (req, res) => {

    try {

        const { vin, make, model, location, email } = req.body;

        const newVehicle = new Vehicle({ email, vin, make, model, location });
        await newVehicle.save();

        console.log(`New Vehicle Added by ${req.body.email}: ${vin}`);
        res.json({ msg: 'New Vehicle Added Successfully', vehicle: newVehicle });

    } catch (error) {

        console.error(`Error Registering Vehicle: ${error.message}`);
        res.status(500).json({ msg: error.message });

    };

};

exports.getAllVehicles = async (req, res) => {

    try {

        const user_id = req.user.id;
        const vehicles = await Vehicle.find({ user_id });

        res.json({ vehicles });
        console.log(`Fetch Successfull ${req.user}`);

    } catch (error) {

        console.error(`Error Getting User Vehicle: ${error.message}`);
        res.status(500).json({ msg: error.message });

    };

};

exports.trackVehicle = async (req, res) => {

    try {

        const { vehicle_id, speed, location } = req.body;
        const vehicle = await Vehicle.findById(vehicle_id);

        if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });

        if (speed > 300) {

            console.log(`Suspicious Activity Detected`);
            await createTwin(vehicle_id, 'Speed is too High');

        }

        res.json({ msg: "Vehicle data processed" });

    } catch (error) {

        console.error(`Vehicle Tracking Error; ${error.message}`);
        res.status(500).json({ msg: error.message });

    }

};