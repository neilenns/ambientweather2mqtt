/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export default class SensorDiscoveryPayload {
  name: string;
  unique_id: string;
  unit_of_measurement: string;
  device_class: string;
  icon: string;
  state_topic: string;
  json_attributes_topic: string;
  value_template: string;
  device: {
    identifiers: string[];
    connections: Array<[string, string]>;
    manufacturer: "Ambient Weather";
    name: "ambientweather2mqtt";
    model: string;
    sw_version: string;
  };
}
