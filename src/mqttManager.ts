/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import MQTT from "async-mqtt";
import env from "./env.js";
import mainLogger from "./log.js";
import TopicRoot from "./topicRoot.js";

const logger = mainLogger.child({ service: "mqtt" });

let connected = false;
let availabilityTopic: string;
let client: MQTT.AsyncClient;

/**
 * Establishes a connection to the MQTT server
 */
export async function initialize(id: string): Promise<void> {
  availabilityTopic = `${TopicRoot}/${id.replace(/:/g, "")}`;

  client = await MQTT.connectAsync(env().MQTT_SERVER, {
    username: env().MQTT_USERNAME,
    password: env().MQTT_PASSWORD,
    clientId: "ambientWeather2mqtt",
    will: {
      topic: availabilityTopic,
      payload: "offline",
      qos: 2,
      retain: true,
    },
    rejectUnauthorized: env().MQTT_REJECT_UNAUTHORIZED,
  }).catch((e) => {
    const error = e as Error;
    throw new Error(`Unable to connect: ${error.message}`);
  });

  logger.info(`Connected to MQTT server ${env().MQTT_SERVER}`, { server: env().MQTT_SERVER });
  connected = true;
}

/**
 * Sends  data to the MQTT server
 * @param data The  data to send
 * @returns A promise
 */
export async function publish(topic: string, data: string, retain?: boolean): Promise<void> {
  if (!connected) {
    logger.error("Attempted to send data but not connected to MQTT server.");
    return;
  }

  logger.debug(`Publishing ${data} to ${topic} with retain: ${retain}`, { data, topic, retain });
  return client.publish(topic, data, { retain });
}

/**
 * Publishes an "online" status to the registered MQTT availability topic
 * @returns A promise
 */
export async function publishOnline() {
  await publishAvailability("online");
}

/**
 * Publishes an "offline" status to the registered MQTT availability topic
 * @returns A promise
 */
export async function publishOffline() {
  await publishAvailability("offline");
}

/**
 * Publishes the specified state to the availability topic.
 * @param state The state, either "online" or "offline"
 * @returns A promise
 */
async function publishAvailability(state: string) {
  if (!connected) {
    logger.error(`Attempted to send ${state} status but not connected to MQTT server.`);
    return;
  }

  logger.debug(`Publishing ${state} to ${availabilityTopic}`, { data: state, topic: availabilityTopic });
  await client.publish(availabilityTopic, state, { retain: true });
}
