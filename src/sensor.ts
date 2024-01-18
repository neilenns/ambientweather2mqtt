/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import DeviceClass from "./deviceClass.js";
import Entity from "./entity.js";
import SensorUnit from "./sensorUnit.js";
import TopicRoot from "./topicRoot.js";

/**
 * Represents a Home Assistant sensor entity
 */
export default class Sensor extends Entity {
  /**
   *
   * @param name The name of the sensor.
   * @param deviceId The unique identifier for the parent device that contains this entity.
   * @param unit The unit of measurement for the sensor. Optional.
   * @param deviceClass The device class for the sensor. Optional.
   * @param icon The mdi icon for the sensor. Optional.
   */
  constructor(name: string, deviceId: string, unit?: SensorUnit, deviceClass?: DeviceClass, icon?: string) {
    super(name, deviceId, unit, deviceClass, icon);

    this.discoveryTopic = `${TopicRoot}/sensor/${deviceId}/${this.discoveryPayload.name}/config`;
    this.stateTopic = `${TopicRoot}/sensor/${deviceId}/${this.discoveryPayload.name}/state`;

    this.discoveryPayload.state_topic = this.stateTopic;
  }
}
