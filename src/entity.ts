/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import DeviceClass from "./deviceClass.js";
import EntityCategory from "./entityCategory.js";
import EntityDataPayload from "./entityDataPayload.js";
import EntityDiscoveryPayload from "./entityDiscoveryPayload.js";
import env from "./env.js";
import mainLogger from "./log.js";
import * as mqttManager from "./mqttManager.js";
import SensorUnit from "./sensorUnit.js";
import StateClass from "./stateClass.js";

const logger = mainLogger.child({ service: "entity" });

/**
 * A weather station sensor.
 */
export default class Entity {
  public isDiscovered = false;
  public discoveryTopic: string;
  public stateTopic: string;
  public availabilityTopic: string;
  public value: EntityDataPayload;
  public discoveryPayload: EntityDiscoveryPayload;
  public retain: boolean;

  private deviceId: string;

  /**
   *
   * @param name The name of the sensor.
   * @param deviceId The unique identifier for the parent device that contains this entity.
   * @param unit The unit of measurement for the sensor. Optional.
   * @param deviceClass The device class for the sensor. Optional.
   * @param icon The mdi icon for the sensor. Optional.
   * @param entityCategory The Home Assistant entity category for the sensor. Optional.
   * @param retain True if the MQTT data topic should be sent with the retain flag set to true. Optional, default false.
   */
  constructor(
    name: string,
    deviceId: string,
    unit?: SensorUnit,
    deviceClass?: DeviceClass,
    icon?: string,
    entityCategory?: EntityCategory,
    retain = false,
    publishName = env().PUBLISH_NAME,
  ) {
    this.deviceId = deviceId;
    this.retain = retain;

    this.discoveryPayload = {
      device: {
        identifiers: [`AW_${this.deviceId}`],
        manufacturer: "Ambient Weather",
        name: publishName,
        model: "Ambient Weather Station",
      },
      device_class: deviceClass,
      state_class: deviceClass === DeviceClass.TIMESTAMP ? undefined : StateClass.MEASUREMENT,
      icon: icon ? `mdi:${icon}` : undefined,
      name: name,
      unique_id: `${this.deviceId ?? "AW"}_${name}`,
      unit_of_measurement: unit,
      entity_category: entityCategory,
    } as EntityDiscoveryPayload;
  }

  /**
   * Publishes the sensor discovery event to MQTT if a valid value is stored for the sensor.
   */
  public publishDiscovery(): Promise<void> {
    // Skip publishing if the value is undefined.
    if (this.value === undefined) {
      logger.debug(
        `Skipping discovery publish for ${this.discoveryPayload.name} since no sensor value has been received yet.`,
      );
      return;
    }

    logger.debug(`Publishing discovery for ${this.discoveryPayload.name}.`, { payload: this.discoveryPayload });

    this.isDiscovered = true;
    return mqttManager.publish(this.discoveryTopic, JSON.stringify(this.discoveryPayload), true);
  }

  /**
   * Publishes the sensor data event to MQTT.
   * @returns A promise
   */
  public async publishData(): Promise<void> {
    // Don't publish if there is no data to send.
    if (this.value === undefined) {
      return;
    }

    // If this is the first time the sensor is publishing data send the discovery message first.
    if (!this.isDiscovered) {
      await this.publishDiscovery();
    }

    // Dates are obnoxious. They must explicitly be written out using toUTCString()
    // otherwise the local system timezone gets added to the base date.
    if (this.value instanceof Date) {
      return mqttManager.publish(this.stateTopic, this.value.toUTCString());
    }

    return mqttManager.publish(this.stateTopic, this.value.toString(), this.retain || env().RETAIN_SENSOR_VALUES);
  }

  /**
   * Publishes an empty retained message for the entity, resulting in it getting
   * removed from the MQTT server. This is used as part of the upgrade code
   * when a breaking change happens.
   */
  public publishRemove(): Promise<void> {
    return mqttManager.publish(this.discoveryTopic, null);
  }
}
