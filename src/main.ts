/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import "dotenv/config";

import * as entityManager from "./entityManager.js";
import env from "./env.js";
import * as log from "./log.js";
import * as mqttManager from "./mqttManager.js";
import * as webServer from "./webServer.js";

/**
 * Starts up the system.
 */
async function startup(): Promise<void> {
  log.info("Main", "Starting up");

  await mqttManager.initialize(env().STATION_MAC_ADDRESS);
  await mqttManager.publishOnline();

  entityManager.initialize();
  await entityManager.upgrade();

  webServer.start();
}

/**
 * Called when a system shutdown message is received to ensure proper cleanup of open sockets.
 */
async function handleDeath(): Promise<void> {
  log.info("Main", "Shutting down.");
  await mqttManager.publishOffline();
  await webServer.stop();
  process.exit(0);
}

/**
 * Registers for the various system shutdown messages to ensure proper cleanup.
 */
function registerForDeath(): void {
  process.on("SIGINT", handleDeath);
  process.on("SIGTERM", handleDeath);
  process.on("SIGQUIT", handleDeath);
  process.on("SIGBREAK", handleDeath);
}

/**
 * The main method that runs the app.
 */
async function main(): Promise<void> {
  registerForDeath();

  // If startup throws any exceptions just bail.
  await startup().catch((e) => {
    log.error("Main", e);
    process.exit(1);
  });

  // Spin in circles waiting.
  wait();
}

function wait() {
  setTimeout(wait, 1000);
}

// Set up a default error handler for any uncaught exceptions. The main one to
// handle is the obnoxious EADDRINUSE error from ExpressJS.
process.on("uncaughtException", (err: NodeJS.ErrnoException) => {
  // EADDRINUSE
  if (err.errno === -4091) {
    log.error("Web server", `Another service is already running on port ${env().PORT}`);
  } else {
    log.error("Main", err.message);
  }
  process.exit(1);
});

main();
