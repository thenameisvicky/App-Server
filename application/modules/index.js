const express = require('express');
const router = express.Router();

const authProxy = require('./auth/auth.server.proxy');
const vehicleProxy = require('./vehicle/vehicle.server.proxy');

router.post('/auth/signup', authProxy.signup);
router.post('/auth/login', authProxy.login);

router.post('/vehicles/add', vehicleProxy.addVehicle);
router.get('/vehicles/:id', vehicleProxy.getAllVehicles);
router.post('/track/:id',vehicleProxy.trackVehicle);

module.exports = router;
