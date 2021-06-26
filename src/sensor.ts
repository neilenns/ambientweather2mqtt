/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import SensorPayload from "./sensorPayload";

const domain = "ambientweather2mqtt";

export default class Sensor {
  discoveryTopic: string;
  attributesTopic: string;
  payload: SensorPayload;

  constructor(name: string, unit: string, deviceClass: string, icon?: string) {
    const cleanedMacAddress = process.env.STATION_MAC_ADDRESS?.replace(/:/g, "");

    this.discoveryTopic = `homeassistant/sensor/${domain}/${name}/config`;
    this.attributesTopic = `homeassistant/sensor/${domain}/${name}/attributes`;

    this.payload = {
      name: `Ambient Weather ${name}`,
      unique_id: `${cleanedMacAddress ?? "AW"}_${name}`,
      unit_of_measurement: unit,
      device_class: deviceClass,
      icon: icon ? `mdi:${icon}` : undefined,
      state_topic: `homeassistant/sensor/${domain}/${name}/state`,
      value_template: `{{ value_json.${name} }}`,
      json_attributes_topic: `homeassistant/sensor/${domain}/${name}/attributes`,
      device: {
        identifiers: [`AW_${cleanedMacAddress}`],
        connections: [["mac", process.env.STATION_MAC_ADDRESS]],
        manufacturer: "Ambient Weather",
        name: "ambientweather2mqtt",
        model: "Ambient Weather Station",
      },
    } as SensorPayload;
  }
}
