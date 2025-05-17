
const vehicleHandler = require('./vehicle.server.handler');
const twinHandler = require('../twin/twin.server.handler')

exports.addVehicle = async (req, res) => {
    try {
        console.log('[PROXY] - addVehicle reached');
        return vehicleHandler.addVehicle(req, res);
    } catch (error) {
        console.error('[PROXY] - addVehicle Error!!!');
    }
}

exports.getAllVehicles = async (req, res) => {
    try {
        console.log('[PROXY] - getAllVehicles reached');
        const simulateBreach = req.headers["x-simulate-breach"];
        console.log(`[VEHICLE] Fetch vehicles for user: ${req.params.id}`);
        if (simulateBreach) {
            console.warn(`[ALERT] Breach Detected - Replacing with Twin`);
            await twinHandler.createTwin(req.params.id, { user_id: req.params.id });
            return res.status(200).json({ msg: "Decoy Twin Created due to breach" });
        }
        return vehicleHandler.getAllVehicles(req, res);
    } catch (error) {
        console.error('[PROXY] - getAllVehicles Error!!!');
    }
}

exports.trackVehicle = async (req, res) => {
    try {
        console.log('[PROXY] - trackVehicle reached');
        return vehicleHandler.trackVehicle(req, res);
    } catch (error) {
        console.error('[PROXY] - trackVehicle Error!!!');
    }
}