/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IPublishPacket } from "mqtt-packet";
import DeviceClass from "./deviceClass";
import * as mqttManager from "./mqttManager";
import Sensor from "./sensor";
import SensorUnit from "./sensorUnit";

let sensors: Sensor[];

export function initialize(): Promise<IPublishPacket[]> {
  sensors = new Array<Sensor>();

  sensors.push(new Sensor("temperatureOutdoor", SensorUnit.F, DeviceClass.TEMPERATURE));

  return Promise.all(
    sensors.map((sensor: Sensor) => {
      return mqttManager.publishSensorDiscovery(sensor);
    }),
  );
}
