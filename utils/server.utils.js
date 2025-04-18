const Promise = require("bluebird");

const terminationArc = (runningServers) => {
  console.log(`[WORKERS] - Terminating...`);

  Promise.map(runningServers, (srv, id) => {
    return new Promise((resolve, reject) => {
      if (!srv || !srv.close) {
        console.log(
          `[WORKER ${id}] - Server #${id} is not active or already closed.`
        );
        return resolve();
      }

      srv.close((err) => {
        if (err) {
          console.log(
            `[WORKER ${id}] - Error closing server #${id}:`,
            err.message
          );
          return reject(err);
        }
        console.log(`[WORKER ${id}] - Closed server #${id}`);
        resolve();
      });
    });
  })
    .then(() => {
      console.log(`[WORKER ${id}] - All active servers terminated. Exiting...`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(`[WORKER ${id}] - Graceful shutdown failed:`, err.message);
      process.exit(1);
    });
};

module.exports = terminationArc;
