/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IPublishPacket } from "mqtt-packet";
import DeviceClass from "./deviceClass";
import * as mqttManager from "./mqttManager";
import Sensor from "./sensor";
import SensorUnit from "./sensorUnit";

export const sensors = new Map<string, Sensor>();

export function initialize(): Promise<IPublishPacket[]> {
  const promises = new Array<Promise<IPublishPacket>>();

  sensors.set("temperatureOutdoor", new Sensor("temperatureOutdoor", SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set("temperatureIndoor", new Sensor("temperatureIndoor", SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set("humidityOutdoor", new Sensor("humidityOutdoor", SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set("humidityIndoor", new Sensor("humidityIndoor", SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(
    "barometricPressureRelative",
    new Sensor("barometricPressureRelative", SensorUnit.inHg, DeviceClass.PRESSURE),
  );
  sensors.set(
    "barometricPressureAbsolute",
    new Sensor("barometricPressureAbsolute", SensorUnit.inHg, DeviceClass.PRESSURE),
  );

  sensors.forEach((value) => {
    promises.push(mqttManager.publishSensorDiscovery(value));
  });

  return Promise.all(promises);
}

export function publishAll(): Promise<IPublishPacket[]> {
  const promises = new Array<Promise<IPublishPacket>>();

  sensors.forEach((value) => {
    promises.push(value.publishData());
  });

  return Promise.all(promises);
}
