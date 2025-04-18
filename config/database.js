const mongoose = require('mongoose');

let connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('[MONGO] - Connection Established Succesfully');
        return true
    } catch (error) {
        console.error('[MONGO] - Error Establishing a Connection: ', error);
        process.exit(1);
        return false
    }
};

module.exports = connection;