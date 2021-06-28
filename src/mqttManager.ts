/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as log from "./log";
import MQTT from "async-mqtt";

let connected = false;

let client: MQTT.AsyncClient;

/**
 * Establishes a connection to the MQTT server
 */
export async function initialize(): Promise<void> {
  client = await MQTT.connectAsync(process.env.MQTT_SERVER, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: "ambientWeather2mqtt",
    rejectUnauthorized: JSON.parse(process.env.MQTT_REJECT_UNAUTHORIZED) ?? true, // hack to convert "true" or "false" to actual boolean
  }).catch((e) => {
    throw new Error(`[MQTT] Unable to connect: ${e.message}`);
  });

  log.info("MQTT", `Connected to MQTT server ${process.env.MQTT_SERVER}`);
  connected = true;
}

/**
 * Sends  data to the MQTT server
 * @param data The  data to send
 * @returns A promise
 */
export async function publish(topic: string, data: string): Promise<MQTT.IPublishPacket> {
  if (!connected) {
    log.info("MQTT", "Attempted to send data but not connected to MQTT server.");
    return;
  }

  return client.publish(topic, data);
}
