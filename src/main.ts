/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import "dotenv/config";

import * as log from "./log";
import * as mqttManager from "./mqttManager";
import * as sensors from "./sensors";
import * as webServer from "./webServer";

/**
 * Starts up the system.
 */
async function startup(): Promise<boolean> {
  log.info("Main", "Starting up");

  if (!verifyEnvironmentVariables()) {
    log.error(
      "Main",
      "Required environment variables are missing, startup halted. Add the missing environment variables then run again.",
    );
    return false;
  }

  await mqttManager.initialize();

  sensors.initialize();
  await sensors.discoverAll();

  webServer.start();

  return true;
}

/**
 * Shuts down everything cleanly.
 */
async function shutdown(): Promise<void> {
  await webServer.stop();
}

function verifyEnvironmentVariables(): boolean {
  if (process.env.MQTT_SERVER === undefined || process.env.MQTT_SERVER === "") {
    log.error(
      "Main",
      "The MQTT_SERVER environment variable isn't set. It must be set to the URL for the MQTT server, e.g. http://192.168.1.1/.",
    );
    return false;
  }

  if (process.env.STATION_MAC_ADDRESS === undefined || process.env.STATION_MAC_ADDRESS === "") {
    log.error(
      "Main",
      "The STATION_MAC_ADDRESS environment variable isn't set. It must be set to MAC address for the Ambient Weather station. The station's MAC address can be found using the awnet app.",
    );
    return false;
  }

  if (process.env.PORT === undefined || process.env.PORT === "") {
    log.error("Main", "The PORT environment variable isn't set. It must be set to the port this service runs on.");
    return false;
  }

  return true;
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

  // If startup returns false then something failed so just bail.
  if (!(await startup())) {
    return;
  }

  // Spin in circles waiting.
  wait();
}

function wait() {
  setTimeout(wait, 1000);
}

main();
