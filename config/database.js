const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./logger');

dotenv.config();

let connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        logger.info('Connection Established Succesfully');
    } catch (error) {
        logger.error('Error Establishing a Connection: ', error);
        process.exit(1);
    }
};

module.exports = connection;