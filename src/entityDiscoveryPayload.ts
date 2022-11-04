/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export default class EntityDiscoveryPayload {
  device: {
    identifiers: string[];
    manufacturer: "Ambient Weather";
    name: "ambientweather2mqtt";
    model: string;
    sw_version: string;
  };
  device_class: string;
  state_class: string;
  icon: string;
  name: string;
  command_topic: string;
  state_topic: string;
  unique_id: string;
  unit_of_measurement: string;
  value_template: string;
}
