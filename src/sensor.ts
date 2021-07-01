/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import DeviceClass from "./deviceClass";
import SensorDiscoveryPayload from "./sensorDiscoveryPayload";
import SensorUnit from "./sensorUnit";
import * as mqttManager from "./mqttManager";
import { IPublishPacket } from "mqtt-packet";
import ISensorDataPayload from "./ISensorDataPayload";

export default class Sensor {
  public isDiscovered = false;
  public discoveryTopic: string;
  public stateTopic: string;
  public availabilityTopic: string;
  public dataPayload: ISensorDataPayload;

  public discoveryPayload: SensorDiscoveryPayload;

  constructor(name: string, unit?: SensorUnit, deviceClass?: DeviceClass, icon?: string) {
    const cleanedMacAddress = process.env.STATION_MAC_ADDRESS?.replace(/:/g, "");

    this.availabilityTopic = `homeassistant/sensor/${cleanedMacAddress}`;
    this.discoveryTopic = `homeassistant/sensor/${cleanedMacAddress}/${name}/config`;
    this.stateTopic = `homeassistant/sensor/${cleanedMacAddress}/${name}/state`;

    this.discoveryPayload = {
      availability_topic: this.availabilityTopic,
      device: {
        identifiers: [`AW_${cleanedMacAddress}`],
        connections: [["mac", process.env.STATION_MAC_ADDRESS]],
        manufacturer: "Ambient Weather",
        name: "ambientweather2mqtt",
        model: "Ambient Weather Station",
      },
      device_class: deviceClass,
      icon: icon ? `mdi:${icon}` : undefined,
      name: name,
      state_topic: this.stateTopic,
      unique_id: `${cleanedMacAddress ?? "AW"}_${name}`,
      unit_of_measurement: unit,
      value_template: `{{ value_json.value }}`,
    } as SensorDiscoveryPayload;
  }

  public publishDiscovery(): Promise<IPublishPacket> {
    return mqttManager.publish(this.discoveryTopic, JSON.stringify(this.discoveryPayload));
  }

  public async publishData(): Promise<IPublishPacket> {
    // If this is the first time the sensor is publishing data
    // send the discovery topic first.
    if (!this.isDiscovered) {
      await this.publishDiscovery();
      this.isDiscovered = true;
    }
    return mqttManager.publish(this.stateTopic, JSON.stringify(this.dataPayload));
  }
}
