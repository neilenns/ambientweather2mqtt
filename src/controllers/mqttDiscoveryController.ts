/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import express from "express";
import * as entityManager from "../entityManager.js";
import mainLogger from "../log.js";

const logger = mainLogger.child({ service: "mqttDiscovery" });

/**
 * Publishes the discovery event for a specific entity or all entities.
 * @param req Express request
 * @param res Express response
 */
export async function discover(req: express.Request, res: express.Response): Promise<void> {
  if (req.params?.entityName) {
    const entity = entityManager.entities.get(req.params.entityName);

    if (!entity) {
      logger.warn(`Unable to publish discovery event for ${req.params.entityName}: entity not found.`);
      res.status(400).send(`Entity not found.`);
      return;
    }

    logger.debug(`Triggering MQTT discover event for ${req.params.entityName}`);
    await entity.publishDiscovery();
  } else {
    logger.debug("Triggering MQTT discover events for all known entities.");
    await entityManager.discoverAll();
  }
  res.status(200).send("Ok");
}
