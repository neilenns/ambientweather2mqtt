/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import SensorDiscoveryPayload from "./sensorDiscoveryPayload";

const domain = "ambientweather2mqtt";

export default class Sensor {
  public discoveryTopic: string;
  public attributesTopic: string;
  public stateTopic: string;

  public discoveryPayload: SensorDiscoveryPayload;

  constructor(name: string, unit: string, deviceClass: string, icon?: string) {
    const cleanedMacAddress = process.env.STATION_MAC_ADDRESS?.replace(/:/g, "");

    this.discoveryTopic = `homeassistant/sensor/${domain}/${name}/config`;
    this.attributesTopic = `homeassistant/sensor/${domain}/${name}/attributes`;
    this.stateTopic = `homeassistant/sensor/${domain}/${name}/state`;

    this.discoveryPayload = {
      name: `Ambient Weather ${name}`,
      unique_id: `${cleanedMacAddress ?? "AW"}_${name}`,
      unit_of_measurement: unit,
      device_class: deviceClass,
      icon: icon ? `mdi:${icon}` : undefined,
      state_topic: this.stateTopic,
      value_template: `{{ value_json.${name} }}`,
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
}
