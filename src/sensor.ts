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
  public discoveryTopic: string;
  public attributesTopic: string;
  public stateTopic: string;
  public dataPayload: ISensorDataPayload;

  public discoveryPayload: SensorDiscoveryPayload;

  constructor(name: string, unit: SensorUnit | undefined, deviceClass: DeviceClass | undefined, icon?: string) {
    const cleanedMacAddress = process.env.STATION_MAC_ADDRESS?.replace(/:/g, "");

    this.discoveryTopic = `homeassistant/sensor/${cleanedMacAddress}/${name}/config`;
    this.attributesTopic = `homeassistant/sensor/${cleanedMacAddress}/${name}/attributes`;
    this.stateTopic = `homeassistant/sensor/${cleanedMacAddress}/${name}/state`;

    this.discoveryPayload = {
      name: name,
      unique_id: `${cleanedMacAddress ?? "AW"}_${name}`,
      unit_of_measurement: unit,
      device_class: deviceClass,
      icon: icon ? `mdi:${icon}` : undefined,
      state_topic: this.stateTopic,
      value_template: `{{ value_json.value }}`,
      json_attributes_topic: this.attributesTopic,
      device: {
        identifiers: [`AW_${cleanedMacAddress}`],
        connections: [["mac", process.env.STATION_MAC_ADDRESS]],
        manufacturer: "Ambient Weather",
        name: "ambientweather2mqtt",
        model: "Ambient Weather Station",
      },
    } as SensorDiscoveryPayload;
  }

  public publishDiscovery(): Promise<IPublishPacket> {
    return mqttManager.publish(this.discoveryTopic, JSON.stringify(this.discoveryPayload));
  }

  public publishData(): Promise<IPublishPacket> {
    return mqttManager.publish(this.stateTopic, JSON.stringify(this.dataPayload));
  }
}
