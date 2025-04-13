const { createLogger, format, transports, info } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    )
});

module.exports = logger;