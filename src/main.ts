/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import "dotenv/config";

import * as webServer from "./webServer";
import * as mqttManager from "./mqttManager";

import * as log from "./Log";

/**
 * Starts up the system.
 */
async function startup(): Promise<void> {
  log.info("Main", "Starting up");

  mqttManager.initialize();
  webServer.start();
}

/**
 * Shuts down everything cleanly.
 */
async function shutdown(): Promise<void> {
  await webServer.stop();
}

/**
 * Called when a system shutdown message is received to ensure proper cleanup of open sockets.
 */
async function handleDeath(): Promise<void> {
  log.info("Main", "Shutting down.");
  await shutdown();
  process.exit();
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

  await startup();

  // Spin in circles waiting.
  wait();
}

function wait() {
  setTimeout(wait, 1000);
}

main();
