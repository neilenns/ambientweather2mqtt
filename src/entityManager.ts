/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IPublishPacket } from "mqtt-packet";
import BinarySensor from "./binarySensor.js";
import DeviceClass from "./deviceClass.js";
import Entity from "./entity.js";
import EntityCategory from "./entityCategory.js";
import EntityNames from "./entityNames.js";
import env from "./env.js";
import mainLogger from "./log.js";
import Sensor from "./sensor.js";
import SensorUnit from "./sensorUnit.js";

const logger = mainLogger.child({ service: "entityManager" });

export const entities = new Map<string, Entity>();

let deviceId: string;
let initialized = false;

export function initialize(): void {
  deviceId = env().STATION_MAC_ADDRESS?.replace(/:/g, "");

  entities.set(
    EntityNames.BAROMETRICPRESSUREABSOLUTE,
    new Sensor(EntityNames.BAROMETRICPRESSUREABSOLUTE, deviceId, SensorUnit.inHg, DeviceClass.PRESSURE),
  );
  entities.set(
    EntityNames.BAROMETRICPRESSURERELATIVE,
    new Sensor(EntityNames.BAROMETRICPRESSURERELATIVE, deviceId, SensorUnit.inHg, DeviceClass.PRESSURE),
  );
  entities.set(
    EntityNames.BATTERY1,
    new Sensor(
      EntityNames.BATTERY1,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY10,
    new Sensor(
      EntityNames.BATTERY10,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY2,
    new Sensor(
      EntityNames.BATTERY2,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY3,
    new Sensor(
      EntityNames.BATTERY3,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY4,
    new Sensor(
      EntityNames.BATTERY4,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY5,
    new Sensor(
      EntityNames.BATTERY5,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY6,
    new Sensor(
      EntityNames.BATTERY6,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY7,
    new Sensor(
      EntityNames.BATTERY7,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY8,
    new Sensor(
      EntityNames.BATTERY8,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERY9,
    new Sensor(
      EntityNames.BATTERY9,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERYCO2OK,
    new Sensor(
      EntityNames.BATTERYCO2OK,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERYOK,
    new Sensor(
      EntityNames.BATTERYOK,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERYPM25OK,
    new Sensor(
      EntityNames.BATTERYPM25OK,
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(
    EntityNames.BATTERYLIGHTNING,
    // The ambient weather name is snake case which breaks the pattern for the rest of the entities.
    new Sensor(
      "batteryLightning",
      deviceId,
      SensorUnit.percent,
      DeviceClass.BATTERY,
      undefined,
      EntityCategory.DIAGNOSTIC,
    ),
  );
  entities.set(EntityNames.CO2, new Sensor(EntityNames.CO2, deviceId, SensorUnit.partsPerMillion, DeviceClass.CO2));
  entities.set(EntityNames.DEWPOINT, new Sensor(EntityNames.DEWPOINT, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE));
  entities.set(
    EntityNames.EVENTDATE,
    new Sensor(EntityNames.EVENTDATE, deviceId, undefined, DeviceClass.TIMESTAMP, "clock-outline"),
  );
  entities.set(
    EntityNames.HUMIDITY1,
    new Sensor(EntityNames.HUMIDITY1, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY10,
    new Sensor(EntityNames.HUMIDITY10, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY2,
    new Sensor(EntityNames.HUMIDITY2, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY3,
    new Sensor(EntityNames.HUMIDITY3, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY4,
    new Sensor(EntityNames.HUMIDITY4, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY5,
    new Sensor(EntityNames.HUMIDITY5, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY6,
    new Sensor(EntityNames.HUMIDITY6, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY7,
    new Sensor(EntityNames.HUMIDITY7, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY8,
    new Sensor(EntityNames.HUMIDITY8, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITY9,
    new Sensor(EntityNames.HUMIDITY9, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITYINDOOR,
    new Sensor(EntityNames.HUMIDITYINDOOR, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.HUMIDITYOUTDOOR,
    new Sensor(EntityNames.HUMIDITYOUTDOOR, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.LIGHTNINGDAY,
    // The ambient weather name is snake case which breaks the pattern for the rest of the entities.
    new Sensor("lightningCount", deviceId, undefined, undefined, "weather-lightning"),
  );
  entities.set(
    EntityNames.LIGHTNINGTIME,
    // The ambient weather name is snake case which breaks the pattern for the rest of the entities.
    new Sensor("lightningTime", deviceId, undefined, DeviceClass.TIMESTAMP, "clock-outline"),
  );
  entities.set(
    EntityNames.LIGHTNINGDISTANCE,
    // The ambient weather name is snake case which breaks the pattern for the rest of the entities.
    new Sensor("lightningDistance", deviceId, SensorUnit.kilometers, undefined, "weather-lightning"),
  );
  entities.set(
    EntityNames.PM25,
    new Sensor(EntityNames.PM25, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.PM25_24HOUR,
    new Sensor(EntityNames.PM25_24HOUR, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.PM25INDOOR,
    new Sensor(EntityNames.PM25INDOOR, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.PM25INDOOR_24HOUR,
    new Sensor(EntityNames.PM25INDOOR_24HOUR, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.RAIN24HOUR,
    new Sensor(EntityNames.RAIN24HOUR, deviceId, SensorUnit.inches, undefined, "weather-pouring"),
  );
  entities.set(
    EntityNames.RAINDAILY,
    new Sensor(EntityNames.RAINDAILY, deviceId, SensorUnit.inches, undefined, "weather-pouring"),
  );
  entities.set(
    EntityNames.RAINEVENT,
    new Sensor(EntityNames.RAINEVENT, deviceId, SensorUnit.inches, undefined, "weather-pouring"),
  );
  entities.set(
    EntityNames.RAINHOURLY,
    new Sensor(EntityNames.RAINHOURLY, deviceId, SensorUnit.inchesPerHour, undefined, "weather-pouring"),
  );
  entities.set(
    EntityNames.RAINMONTHLY,
    new Sensor(EntityNames.RAINMONTHLY, deviceId, SensorUnit.inches, undefined, "weather-pouring"),
  );
  entities.set(
    EntityNames.RAINTOTAL,
    new Sensor(EntityNames.RAINTOTAL, deviceId, SensorUnit.inches, undefined, "weather-pouring"),
  );
  entities.set(
    EntityNames.RAINWEEKLY,
    new Sensor(EntityNames.RAINWEEKLY, deviceId, SensorUnit.inches, undefined, "weather-pouring"),
  );
  entities.set(EntityNames.RELAY1, new BinarySensor(EntityNames.RELAY1, deviceId));
  entities.set(EntityNames.RELAY10, new BinarySensor(EntityNames.RELAY10, deviceId));
  entities.set(EntityNames.RELAY2, new BinarySensor(EntityNames.RELAY2, deviceId));
  entities.set(EntityNames.RELAY3, new BinarySensor(EntityNames.RELAY3, deviceId));
  entities.set(EntityNames.RELAY4, new BinarySensor(EntityNames.RELAY4, deviceId));
  entities.set(EntityNames.RELAY5, new BinarySensor(EntityNames.RELAY5, deviceId));
  entities.set(EntityNames.RELAY6, new BinarySensor(EntityNames.RELAY6, deviceId));
  entities.set(EntityNames.RELAY7, new BinarySensor(EntityNames.RELAY7, deviceId));
  entities.set(EntityNames.RELAY8, new BinarySensor(EntityNames.RELAY8, deviceId));
  entities.set(EntityNames.RELAY9, new BinarySensor(EntityNames.RELAY9, deviceId));
  entities.set(
    EntityNames.SOILHUMIDITY1,
    new Sensor(EntityNames.SOILHUMIDITY1, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY10,
    new Sensor(EntityNames.SOILHUMIDITY10, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY2,
    new Sensor(EntityNames.SOILHUMIDITY2, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY3,
    new Sensor(EntityNames.SOILHUMIDITY3, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY4,
    new Sensor(EntityNames.SOILHUMIDITY4, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY5,
    new Sensor(EntityNames.SOILHUMIDITY5, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY6,
    new Sensor(EntityNames.SOILHUMIDITY6, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY7,
    new Sensor(EntityNames.SOILHUMIDITY7, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY8,
    new Sensor(EntityNames.SOILHUMIDITY8, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILHUMIDITY9,
    new Sensor(EntityNames.SOILHUMIDITY9, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE1,
    new Sensor(EntityNames.SOILTEMPERATURE1, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE10,
    new Sensor(EntityNames.SOILTEMPERATURE10, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE2,
    new Sensor(EntityNames.SOILTEMPERATURE2, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE3,
    new Sensor(EntityNames.SOILTEMPERATURE3, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE4,
    new Sensor(EntityNames.SOILTEMPERATURE4, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE5,
    new Sensor(EntityNames.SOILTEMPERATURE5, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE6,
    new Sensor(EntityNames.SOILTEMPERATURE6, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE7,
    new Sensor(EntityNames.SOILTEMPERATURE7, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE8,
    new Sensor(EntityNames.SOILTEMPERATURE8, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOILTEMPERATURE9,
    new Sensor(EntityNames.SOILTEMPERATURE9, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.SOLARRADIATION,
    new Sensor(EntityNames.SOLARRADIATION, deviceId, SensorUnit.radiation, undefined, "solar-power"),
  );
  entities.set(
    EntityNames.TEMPERATURE1,
    new Sensor(EntityNames.TEMPERATURE1, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE10,
    new Sensor(EntityNames.TEMPERATURE10, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE2,
    new Sensor(EntityNames.TEMPERATURE2, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE3,
    new Sensor(EntityNames.TEMPERATURE3, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE4,
    new Sensor(EntityNames.TEMPERATURE4, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE5,
    new Sensor(EntityNames.TEMPERATURE5, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE6,
    new Sensor(EntityNames.TEMPERATURE6, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE7,
    new Sensor(EntityNames.TEMPERATURE7, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE8,
    new Sensor(EntityNames.TEMPERATURE8, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATURE9,
    new Sensor(EntityNames.TEMPERATURE9, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATUREINDOOR,
    new Sensor(EntityNames.TEMPERATUREINDOOR, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.TEMPERATUREOUTDOOR,
    new Sensor(EntityNames.TEMPERATUREOUTDOOR, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.WINDCHILL,
    new Sensor(EntityNames.WINDCHILL, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.WINDDIRECTION,
    new Sensor(EntityNames.WINDDIRECTION, deviceId, undefined, undefined, "weather-windy"),
  );
  entities.set(
    EntityNames.WINDDIRECTION_AVG10M,
    new Sensor(EntityNames.WINDDIRECTION_AVG10M, deviceId, undefined, undefined, "weather-windy"),
  );
  entities.set(
    EntityNames.WINDDIRECTION_AVG2M,
    new Sensor(EntityNames.WINDDIRECTION_AVG2M, deviceId, undefined, undefined, "weather-windy"),
  );
  entities.set(
    EntityNames.WINDGUST,
    new Sensor(EntityNames.WINDGUST, deviceId, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  entities.set(
    EntityNames.WINDMAXDAILYGUST,
    new Sensor(EntityNames.WINDMAXDAILYGUST, deviceId, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  entities.set(
    EntityNames.WINDSPEED,
    new Sensor(EntityNames.WINDSPEED, deviceId, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  entities.set(
    EntityNames.WINDSPEED_AVG10M,
    new Sensor(EntityNames.WINDSPEED_AVG10M, deviceId, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  entities.set(
    EntityNames.WINDSPEED_AVG2M,
    new Sensor(EntityNames.WINDSPEED_AVG2M, deviceId, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  entities.set(EntityNames.UV, new Sensor(EntityNames.UV, deviceId, undefined, undefined, "weather-sunny"));

  // AQIN sensors
  entities.set(
    EntityNames.AQI_PM25_AQIN,
    new Sensor(EntityNames.AQI_PM25_AQIN, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.AQI_PM25_24H_AQIN,
    new Sensor(EntityNames.AQI_PM25_24H_AQIN, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.PM25_IN_AQIN,
    new Sensor(EntityNames.PM25_IN_AQIN, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.PM25_IN_24HR_AQIN,
    new Sensor(EntityNames.PM25_IN_24HR_AQIN, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.PM10_IN_AQIN,
    new Sensor(EntityNames.PM10_IN_AQIN, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.PM10_IN_24H_AQIN,
    new Sensor(EntityNames.PM10_IN_24H_AQIN, deviceId, SensorUnit.particulate, undefined, "air-filter"),
  );
  entities.set(
    EntityNames.CO2_IN_AQIN,
    new Sensor(EntityNames.CO2_IN_AQIN, deviceId, SensorUnit.partsPerMillion, DeviceClass.CO2),
  );
  entities.set(
    EntityNames.CO2_IN_24H_AQIN,
    new Sensor(EntityNames.CO2_IN_24H_AQIN, deviceId, SensorUnit.partsPerMillion, DeviceClass.CO2),
  );
  entities.set(
    EntityNames.PM_IN_TEMP_AQIN,
    new Sensor(EntityNames.PM_IN_TEMP_AQIN, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.PM_IN_HUMIDITY_AQIN,
    new Sensor(EntityNames.PM_IN_HUMIDITY_AQIN, deviceId, SensorUnit.percent, DeviceClass.HUMIDITY),
  );

  // Calculated sensors
  entities.set(
    EntityNames.SOLARRADIATION_LUX,
    new Sensor(EntityNames.SOLARRADIATION_LUX, deviceId, SensorUnit.illuminance, DeviceClass.ILLUMINANCE),
  );
  entities.set(
    EntityNames.FEELSLIKE,
    new Sensor(EntityNames.FEELSLIKE, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE1,
    new Sensor(EntityNames.FEELSLIKE1, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE2,
    new Sensor(EntityNames.FEELSLIKE2, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE3,
    new Sensor(EntityNames.FEELSLIKE3, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE4,
    new Sensor(EntityNames.FEELSLIKE4, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE5,
    new Sensor(EntityNames.FEELSLIKE5, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE6,
    new Sensor(EntityNames.FEELSLIKE6, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE7,
    new Sensor(EntityNames.FEELSLIKE7, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE8,
    new Sensor(EntityNames.FEELSLIKE8, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE9,
    new Sensor(EntityNames.FEELSLIKE9, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE10,
    new Sensor(EntityNames.FEELSLIKE10, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.FEELSLIKE10,
    new Sensor(EntityNames.FEELSLIKE10, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.LASTRAIN,
    new Sensor(EntityNames.LASTRAIN, deviceId, undefined, DeviceClass.TIMESTAMP, "clock-outline"),
  );
  entities.set(
    EntityNames.DEWPOINT1,
    new Sensor(EntityNames.DEWPOINT1, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT2,
    new Sensor(EntityNames.DEWPOINT2, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT3,
    new Sensor(EntityNames.DEWPOINT3, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT4,
    new Sensor(EntityNames.DEWPOINT4, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT5,
    new Sensor(EntityNames.DEWPOINT5, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT6,
    new Sensor(EntityNames.DEWPOINT6, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT7,
    new Sensor(EntityNames.DEWPOINT7, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT8,
    new Sensor(EntityNames.DEWPOINT8, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT9,
    new Sensor(EntityNames.DEWPOINT9, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  entities.set(
    EntityNames.DEWPOINT10,
    new Sensor(EntityNames.DEWPOINT10, deviceId, SensorUnit.F, DeviceClass.TEMPERATURE),
  );

  initialized = true;
}

/**
 * Removes old entities from the MQTT server.
 */
export async function upgrade(): Promise<void> {
  if (!initialized) {
    logger.error("Attempted to call upgrade() but initialize() wasn't called first.");
  }

  // eslint-disable-next-line deprecation/deprecation
  await new Sensor(EntityNames.DATE, deviceId).publishRemove();
}

/**
 * Publishes MQTT discover messages for all registered sensors that have data.
 * @returns Promises
 */
export function discoverAll(): Promise<IPublishPacket[]> {
  const promises = new Array<Promise<IPublishPacket>>();

  entities.forEach((value) => {
    promises.push(value.publishDiscovery());
  });

  return Promise.all(promises);
}

/**
 * Publishes data for all sensors that have received a value.
 * @returns Promises
 */
export function publishAll(): Promise<IPublishPacket[]> {
  const promises = new Array<Promise<IPublishPacket>>();

  entities.forEach((value) => {
    promises.push(value.publishData());
  });

  return Promise.all(promises);
}
