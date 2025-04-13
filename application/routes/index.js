const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.server.controller');
const vehicleController = require('../controller/vehicle.server.controller');

router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);

router.post('/vehicles/add', vehicleController.addVehicle);
router.get('/vehicles/:id', vehicleController.getAllVehicles);

module.exports = router;
