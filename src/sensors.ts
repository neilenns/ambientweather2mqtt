/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IPublishPacket } from "mqtt-packet";
import DeviceClass from "./deviceClass";
import * as mqttManager from "./mqttManager";
import Sensor from "./sensor";
import SensorNames from "./sensorNames";
import SensorUnit from "./sensorUnit";

export const sensors = new Map<string, Sensor>();

export function initialize(): Promise<IPublishPacket[]> {
  const promises = new Array<Promise<IPublishPacket>>();

  sensors.set(
    SensorNames.WINDGUST,
    new Sensor(SensorNames.WINDGUST, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDSPEED,
    new Sensor(SensorNames.WINDSPEED, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDMAXDAILYGUST,
    new Sensor(SensorNames.WINDMAXDAILYGUST, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.TEMPERATUREOUTDOOR,
    new Sensor(SensorNames.TEMPERATUREOUTDOOR, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.TEMPERATUREINDOOR,
    new Sensor(SensorNames.TEMPERATUREINDOOR, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.HUMIDITYOUTDOOR,
    new Sensor(SensorNames.HUMIDITYOUTDOOR, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.HUMIDITYINDOOR,
    new Sensor(SensorNames.HUMIDITYINDOOR, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.BAROMETRICPRESSURERELATIVE,
    new Sensor(SensorNames.BAROMETRICPRESSURERELATIVE, SensorUnit.inHg, DeviceClass.PRESSURE),
  );
  sensors.set(
    SensorNames.BAROMETRICPRESSUREABSOLUTE,
    new Sensor(SensorNames.BAROMETRICPRESSUREABSOLUTE, SensorUnit.inHg, DeviceClass.PRESSURE),
  );
  sensors.set(
    SensorNames.RAINDAILY,
    new Sensor(SensorNames.RAINDAILY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINHOURLY,
    new Sensor(SensorNames.RAINHOURLY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINDAILY,
    new Sensor(SensorNames.RAINDAILY, SensorUnit.inches, undefined, "weather-pouring"),
  );

  sensors.set(
    SensorNames.RAINEVENT,
    new Sensor(SensorNames.RAINEVENT, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINDAILY,
    new Sensor(SensorNames.RAINDAILY, SensorUnit.inches, undefined, "weather-pouring"),
  );

  sensors.set(
    SensorNames.RAINWEEKLY,
    new Sensor(SensorNames.RAINWEEKLY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINMONTHLY,
    new Sensor(SensorNames.RAINMONTHLY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINTOTAL,
    new Sensor(SensorNames.RAINTOTAL, SensorUnit.inches, undefined, "weather-pouring"),
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
