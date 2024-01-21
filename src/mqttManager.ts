/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import MQTT from "async-mqtt";
import * as log from "./log.js";
import TopicRoot from "./topicRoot.js";

let connected = false;
let availabilityTopic: string;
let client: MQTT.AsyncClient;

/**
 * Establishes a connection to the MQTT server
 */
export async function initialize(id: string): Promise<void> {
  availabilityTopic = `${TopicRoot}/${id.replace(/:/g, "")}`;

  client = await MQTT.connectAsync(process.env.MQTT_SERVER, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: "ambientWeather2mqtt",
    will: {
      topic: availabilityTopic,
      payload: "offline",
      qos: 2,
      retain: true,
    },
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
export async function publish(topic: string, data: string, retain?: boolean): Promise<void> {
  if (!connected) {
    log.info("MQTT", "Attempted to send data but not connected to MQTT server.");
    return;
  }

  return client.publish(topic, data, { retain });
}

/**
 * Publishes an "online" status to the registered MQTT availability topic
 * @returns A promise
 */
export async function publishOnline(): Promise<void> {
  if (!connected) {
    log.info("MQTT", "Attempted to send online status but not connected to MQTT server.");
    return;
  }

  return client.publish(availabilityTopic, "online", { retain: true });
}

/**
 * Publishes an "offline" status to the registered MQTT availability topic
 * @returns A promise
 */
export async function publishOffline(): Promise<void> {
  if (!connected) {
    log.info("MQTT", "Attempted to send offline status but not connected to MQTT server.");
    return;
  }

  return client.publish(availabilityTopic, "offline", { retain: true });
}
