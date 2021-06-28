/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as ambientWeatherHandler from "./ambientWeatherHandler";
import express from "express";
import * as log from "./log";
import { Server } from "http";
import { createHttpTerminator, HttpTerminator } from "http-terminator";

const app = express();
const port = 8080;
let server: Server;
let httpTerminator: HttpTerminator;

/**
 * Start up the Express web server.
 */
export function start(): void {
  app.get("/data", ambientWeatherHandler.processAmbientWeatherData);

  try {
    server = app.listen(port, () => log.info("Web server", `Listening at http://localhost:${port}`));
    httpTerminator = createHttpTerminator({
      server,
    });
  } catch (e) {
    log.info("Web server", `Unable to start web server: ${e.error}`);
  }
}

/**
 * Shut down the Express web server
 */
export async function stop(): Promise<void> {
  if (server) {
    log.info("Web server", "Stopping.");
    await httpTerminator.terminate();
  }
}
