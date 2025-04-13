const { Server } = require('socket.io');

let io;

function initSocket(server) {
    io = new Server(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log(`Client Connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Client Disconnected: ${socket.id}`);
        });
    });

};

function sendThreatAlert(vehicleId, message) {
    if (io) {
        io.emit('threat_alert', { vehicleId, message });
        console.log(`Alert sent Vehicle ID: ${vehicleId}`);
    };
};

module.exports = { initSocket, sendThreatAlert };
