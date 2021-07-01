/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as log from "./log";
import * as sensors from "./sensors";
import express from "express";

export async function discover(req: express.Request, res: express.Response): Promise<void> {
  log.info("Discovery", "Triggering MQTT discover events for all known sensors.");
  await sensors.discoverAll();

  res.status(200).send("Ok");
}
