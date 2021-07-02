/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import Entity from "./entity";

/**
 * Represents a Home Assistant sensor entity
 */
export default class Switch extends Entity {
  /**
   * Creates a new Switch entity.
   * @param name The name of the sensor.
   * @param deviceId The unique identifier for the parent device that contains this entity.
   */
  constructor(name: string, deviceId: string) {
    super(name, deviceId);

    this.discoveryTopic = `homeassistant/switch/${deviceId}/${this.discoveryPayload.name}/config`;
    this.stateTopic = `homeassistant/switch/${deviceId}/${this.discoveryPayload.name}/state`;
  }
}
