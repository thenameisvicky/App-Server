const express = require('express');
const router = express.Router();

const authHandler = require('./auth/auth.server.handler');
const vehicleHandler = require('./vehicle/vehicle.server.handler');

router.post('/auth/signup', authHandler.signup);
router.post('/auth/login', authHandler.login);

router.post('/vehicles/add', vehicleHandler.addVehicle);
router.get('/vehicles/:id', vehicleHandler.getAllVehicles);

module.exports = router;
