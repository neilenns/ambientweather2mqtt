/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import DeviceClass from "./deviceClass";
import SensorDiscoveryPayload from "./sensorDiscoveryPayload";
import SensorUnit from "./sensorUnit";
import * as log from "./log";
import * as mqttManager from "./mqttManager";
import { IPublishPacket } from "mqtt-packet";
import SensorDataPayload from "./SensorDataPayload";

/**
 * A weather station sensor.
 */
export default class Sensor {
  public isDiscovered = false;
  public discoveryTopic: string;
  public stateTopic: string;
  public availabilityTopic: string;
  public value: SensorDataPayload;
  public discoveryPayload: SensorDiscoveryPayload;

  /**
   *
   * @param name The name of the sensor
   * @param unit The unit of measurement for the sensor. Optional.
   * @param deviceClass The device class for the sensor. Optional.
   * @param icon The mdi icon for the sensor. Optional.
   */
  constructor(name: string, unit?: SensorUnit, deviceClass?: DeviceClass, icon?: string) {
    const cleanedMacAddress = process.env.STATION_MAC_ADDRESS?.replace(/:/g, "");

    this.availabilityTopic = `homeassistant/sensor/${cleanedMacAddress}`;
    this.discoveryTopic = `homeassistant/sensor/${cleanedMacAddress}/${name}/config`;
    this.stateTopic = `homeassistant/sensor/${cleanedMacAddress}/${name}/state`;

    this.discoveryPayload = {
      availability_topic: this.availabilityTopic,
      device: {
        identifiers: [`AW_${cleanedMacAddress}`],
        manufacturer: "Ambient Weather",
        name: "ambientweather2mqtt",
        model: "Ambient Weather Station",
      },
      device_class: deviceClass,
      icon: icon ? `mdi:${icon}` : undefined,
      name: name,
      state_topic: this.stateTopic,
      unique_id: `${cleanedMacAddress ?? "AW"}_${name}`,
      unit_of_measurement: unit,
    } as SensorDiscoveryPayload;
  }

  /**
   * Publishes the sensor discovery event to MQTT if a valid value is stored for the sensor.
   */
  public publishDiscovery(): Promise<IPublishPacket> {
    // Skip publishing if the value is undefined.
    if (this.value === undefined) {
      return;
    }

    log.verbose("Sensor", `Publishing discovery for ${this.discoveryPayload.name}.`);

    this.isDiscovered = true;
    return mqttManager.publish(this.discoveryTopic, JSON.stringify(this.discoveryPayload));
  }

  /**
   * Publishes the sensor data event to MQTT.
   * @returns A promise
   */
  public async publishData(): Promise<IPublishPacket> {
    // Don't publish if there is no data to send.
    if (this.value === undefined) {
      return;
    }

    // If this is the first time the sensor is publishing data send the discovery message first.
    if (!this.isDiscovered) {
      await this.publishDiscovery();
    }

    return mqttManager.publish(this.stateTopic, JSON.stringify(this.value));
  }
}
