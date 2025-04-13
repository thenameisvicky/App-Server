const throng = require('throng');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connection = require('./config/database');
const logger = require('./config/logger');
const { createServer } = require('http');
const { initSocket } = require('./application/websocket/socket');
const routes = require('./application/routes');
const Promise = require('bluebird');

dotenv.config();
connection();

const WORKERS = Number(process.env.WEB_CONCURRENCY) || require('os').cpus().length;

function startServer() {
    try {
        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use('/api', routes);

        const PORT = process.env.PORT || 5000;

        const server = createServer(app);
        initSocket(server);

        server.listen(PORT, () => {
            console.log(`SERVER STARTED: PORT-${PORT}`);
        });


        process.on('SIGTERM', async () => {
            console.log(`Worker ${process.pid} received SIGTERM. Starting shutdown...`);
            await handleTermination();
        });


    } catch (error) {
        logger.error('Error Running Server:', error);
    }
}


async function handleTermination() {
    try {
        console.log(`Closing resources for Worker ${process.pid}...`);

        await Promise.delay(1000);

        console.log(`Cleanup completed. Exiting Worker ${process.pid}`);
        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
}

throng({
    workers: WORKERS,
    lifetime: Infinity,
    start: () => {
        startServer();
    }
});