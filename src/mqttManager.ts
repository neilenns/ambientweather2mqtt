/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as log from "./log";
import MQTT from "async-mqtt";
import { WeatherData } from "./weatherData";

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
    rejectUnauthorized: false ?? true,
  }).catch((e) => {
    throw new Error(`[MQTT] Unable to connect: ${e.message}`);
  });

  log.info("MQTT", `Connected to MQTT server ${process.env.MQTT_SERVER}`);
  connected = true;
}

/**
 * Sends weather data to the MQTT server
 * @param data The weather data to send
 * @returns A promise
 */
export async function publishWeatherData(data: WeatherData): Promise<MQTT.IPublishPacket> {
  if (!connected) {
    log.info("MQTT", "Attempted to send weather data but not connected to MQTT server.");
    return;
  }

  return client.publish("test topic", JSON.stringify(data));
}
