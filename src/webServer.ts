/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as mqttDiscoveryController from "./controllers/mqttDiscoveryController.js";
import * as weatherDataController from "./controllers/weatherDataController.js";

import express from "express";
import { Server } from "http";
import { createHttpTerminator, HttpTerminator } from "http-terminator";
import morgan from "morgan";
import env from "./env.js";
import mainLogger from "./log.js";

const logger = mainLogger.child({ service: "express" });

const morganMiddleware = morgan(env().NODE_ENV === "production" ? "common" : "dev", {
  stream: {
    // Configure Morgan to use our custom logger with the http severity
    write: (message) => logger.http(message.trim()),
  },
});

const app = express();
let server: Server;
let httpTerminator: HttpTerminator;

/**
 * Start up the Express web server.
 */
export function start(): void {
  app.use(morganMiddleware);

  // Ambient Weather protocol endpoint
  app.get("/data", weatherDataController.processWeatherData);

  // Weather Underground protocol endpoint
  app.get("/weatherstation/updateweatherstation.php", weatherDataController.processWeatherData);

  // Force auto-discovery MQTT messages
  app.get("/discover/", mqttDiscoveryController.discover);
  app.get("/discover/:entityName", mqttDiscoveryController.discover);

  try {
    server = app.listen(env().PORT, () => logger.info(`Listening at http://localhost:${env().PORT}`));
    httpTerminator = createHttpTerminator({
      server,
    });
  } catch (e) {
    throw new Error(`Unable to start web server: ${e.error}`);
  }
}

/**
 * Shut down the Express web server
 */
export async function stop(): Promise<void> {
  if (server) {
    logger.info("Stopping");
    await httpTerminator.terminate();
  }
}
