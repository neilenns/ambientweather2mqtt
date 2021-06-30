/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import DeviceClass from "./deviceClass";
import Sensor from "./sensor";
import SensorUnit from "./sensorUnit";

/**
 * A special type of sensor to represent battery data from the weather station.
 * The icon gets set to a template so it changes based on the battery status.
 */
export default class BatterySensor extends Sensor {
  constructor(name: string, unit?: SensorUnit, deviceClass?: DeviceClass, icon?: string) {
    super(name, unit, deviceClass, icon);

    this.discoveryPayload.icon = `{% if is_state(entity_id, true) %} mdi:battery {% else %} mdi:battery-10 {% endif %}`;
  }
}
