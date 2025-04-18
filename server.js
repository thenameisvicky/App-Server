const express = require("express");
const throng = require("throng");
const os = require("os");
const router = require("./application/routes");
const terminationArc = require("./utils/server.utils");
const connection = require("./config/database");

const workersCount = os.cpus().length || 4;
let PORT = 3000;

const runningServers = [];

async function startServer(id) {
  try {
    const app = express();
    app.use(express.json());

    app.use("/api", router);

    const server = app.listen(PORT, () => {
      console.log(`[WORKER ${id}] - Listening on Port: ${PORT}`);
    });

    runningServers.push({ id: server });

    process.on("SIGINT", () => terminationArc(runningServers));
    process.on("SIGTERM", () => terminationArc(runningServers));
  } catch (error) {
    console.error(`[SERVER] - Error Starting Server: ${error.message}`);
  }
}

async function masterProcess() {
  console.log("[MASTER] - Process Started");

  const connected = await connection();
  if (!connected) {
    console.error("[MASTER] - DB connection failed. Exiting...");
    process.exit(1);
  }
}

throng({
  workers: workersCount,
  lifetime: Infinity,
  master: masterProcess,
  start: (id) => {
    startServer(id);
  },
});
