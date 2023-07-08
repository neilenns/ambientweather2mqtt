/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import Entity from "./entity";
import TopicRoot from "./topicRoot";

/**
 * Represents a Home Assistant binary sensor entity
 */
export default class BinarySensor extends Entity {
  /**
   * Creates a new Switch entity.
   * @param name The name of the sensor.
   * @param deviceId The unique identifier for the parent device that contains this entity.
   */
  constructor(name: string, deviceId: string) {
    super(name, deviceId);

    this.discoveryTopic = `${TopicRoot}/binary_sensor/${deviceId}/${this.discoveryPayload.name}/config`;
    this.stateTopic = `${TopicRoot}/binary_sensor/${deviceId}/${this.discoveryPayload.name}/state`;

    this.discoveryPayload.state_topic = this.stateTopic;
  }
}
