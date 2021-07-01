/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IPublishPacket } from "mqtt-packet";
import DeviceClass from "./deviceClass";
import Sensor from "./sensor";
import SensorNames from "./sensorNames";
import SensorUnit from "./sensorUnit";

export const sensors = new Map<string, Sensor>();

export function initialize(): void {
  sensors.set(
    SensorNames.BAROMETRICPRESSUREABSOLUTE,
    new Sensor(SensorNames.BAROMETRICPRESSUREABSOLUTE, SensorUnit.inHg, DeviceClass.PRESSURE),
  );
  sensors.set(
    SensorNames.BAROMETRICPRESSURERELATIVE,
    new Sensor(SensorNames.BAROMETRICPRESSURERELATIVE, SensorUnit.inHg, DeviceClass.PRESSURE),
  );
  sensors.set(SensorNames.BATTERY1, new Sensor(SensorNames.BATTERY1, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY10, new Sensor(SensorNames.BATTERY10, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY2, new Sensor(SensorNames.BATTERY2, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY3, new Sensor(SensorNames.BATTERY3, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY4, new Sensor(SensorNames.BATTERY4, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY5, new Sensor(SensorNames.BATTERY5, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY6, new Sensor(SensorNames.BATTERY6, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY7, new Sensor(SensorNames.BATTERY7, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY8, new Sensor(SensorNames.BATTERY8, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERY9, new Sensor(SensorNames.BATTERY9, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERYCO2OK, new Sensor(SensorNames.BATTERYCO2OK, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(SensorNames.BATTERYOK, new Sensor(SensorNames.BATTERYOK, SensorUnit.percent, DeviceClass.BATTERY));
  sensors.set(
    SensorNames.BATTERYPM25OK,
    new Sensor(SensorNames.BATTERYPM25OK, SensorUnit.percent, DeviceClass.BATTERY),
  );
  sensors.set(SensorNames.CO2, new Sensor(SensorNames.CO2, SensorUnit.particulate, DeviceClass.CO2));
  sensors.set(SensorNames.DATE, new Sensor(SensorNames.DATE, SensorUnit.timestamp, undefined, "clock-outline"));
  sensors.set(SensorNames.DEWPOINT, new Sensor(SensorNames.DEWPOINT, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.HUMIDITY1, new Sensor(SensorNames.HUMIDITY1, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY10, new Sensor(SensorNames.HUMIDITY10, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY2, new Sensor(SensorNames.HUMIDITY2, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY3, new Sensor(SensorNames.HUMIDITY3, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY4, new Sensor(SensorNames.HUMIDITY4, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY5, new Sensor(SensorNames.HUMIDITY5, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY6, new Sensor(SensorNames.HUMIDITY6, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY7, new Sensor(SensorNames.HUMIDITY7, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY8, new Sensor(SensorNames.HUMIDITY8, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(SensorNames.HUMIDITY9, new Sensor(SensorNames.HUMIDITY9, SensorUnit.percent, DeviceClass.HUMIDITY));
  sensors.set(
    SensorNames.HUMIDITYINDOOR,
    new Sensor(SensorNames.HUMIDITYINDOOR, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.HUMIDITYOUTDOOR,
    new Sensor(SensorNames.HUMIDITYOUTDOOR, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(SensorNames.PM25, new Sensor(SensorNames.PM25, SensorUnit.particulate, undefined, "air-filter"));
  sensors.set(
    SensorNames.PM25_24HOUR,
    new Sensor(SensorNames.PM25_24HOUR, SensorUnit.particulate, undefined, "air-filter"),
  );
  sensors.set(
    SensorNames.PM25INDOOR,
    new Sensor(SensorNames.PM25INDOOR, SensorUnit.particulate, undefined, "air-filter"),
  );
  sensors.set(
    SensorNames.PM25INDOOR_24HOUR,
    new Sensor(SensorNames.PM25INDOOR_24HOUR, SensorUnit.particulate, undefined, "air-filter"),
  );
  sensors.set(
    SensorNames.RAIN24HOUR,
    new Sensor(SensorNames.RAIN24HOUR, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINDAILY,
    new Sensor(SensorNames.RAINDAILY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINEVENT,
    new Sensor(SensorNames.RAINEVENT, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINHOURLY,
    new Sensor(SensorNames.RAINHOURLY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINMONTHLY,
    new Sensor(SensorNames.RAINMONTHLY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINTOTAL,
    new Sensor(SensorNames.RAINTOTAL, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.RAINWEEKLY,
    new Sensor(SensorNames.RAINWEEKLY, SensorUnit.inches, undefined, "weather-pouring"),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY1,
    new Sensor(SensorNames.SOILHUMIDITY1, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY10,
    new Sensor(SensorNames.SOILHUMIDITY10, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY2,
    new Sensor(SensorNames.SOILHUMIDITY2, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY3,
    new Sensor(SensorNames.SOILHUMIDITY3, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY4,
    new Sensor(SensorNames.SOILHUMIDITY4, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY5,
    new Sensor(SensorNames.SOILHUMIDITY5, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY6,
    new Sensor(SensorNames.SOILHUMIDITY6, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY7,
    new Sensor(SensorNames.SOILHUMIDITY7, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY8,
    new Sensor(SensorNames.SOILHUMIDITY8, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILHUMIDITY9,
    new Sensor(SensorNames.SOILHUMIDITY9, SensorUnit.percent, DeviceClass.HUMIDITY),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE1,
    new Sensor(SensorNames.SOILTEMPERATURE1, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE10,
    new Sensor(SensorNames.SOILTEMPERATURE10, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE2,
    new Sensor(SensorNames.SOILTEMPERATURE2, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE3,
    new Sensor(SensorNames.SOILTEMPERATURE3, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE4,
    new Sensor(SensorNames.SOILTEMPERATURE4, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE5,
    new Sensor(SensorNames.SOILTEMPERATURE5, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE6,
    new Sensor(SensorNames.SOILTEMPERATURE6, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE7,
    new Sensor(SensorNames.SOILTEMPERATURE7, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE8,
    new Sensor(SensorNames.SOILTEMPERATURE8, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOILTEMPERATURE9,
    new Sensor(SensorNames.SOILTEMPERATURE9, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.SOLARRADIATION,
    new Sensor(SensorNames.SOLARRADIATION, SensorUnit.radiation, undefined, "solar-power"),
  );
  sensors.set(SensorNames.TEMPERATURE1, new Sensor(SensorNames.TEMPERATURE1, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE10, new Sensor(SensorNames.TEMPERATURE10, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE2, new Sensor(SensorNames.TEMPERATURE2, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE3, new Sensor(SensorNames.TEMPERATURE3, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE4, new Sensor(SensorNames.TEMPERATURE4, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE5, new Sensor(SensorNames.TEMPERATURE5, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE6, new Sensor(SensorNames.TEMPERATURE6, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE7, new Sensor(SensorNames.TEMPERATURE7, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE8, new Sensor(SensorNames.TEMPERATURE8, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.TEMPERATURE9, new Sensor(SensorNames.TEMPERATURE9, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(
    SensorNames.TEMPERATUREINDOOR,
    new Sensor(SensorNames.TEMPERATUREINDOOR, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(
    SensorNames.TEMPERATUREOUTDOOR,
    new Sensor(SensorNames.TEMPERATUREOUTDOOR, SensorUnit.F, DeviceClass.TEMPERATURE),
  );
  sensors.set(SensorNames.WINDCHILL, new Sensor(SensorNames.WINDCHILL, SensorUnit.F, DeviceClass.TEMPERATURE));
  sensors.set(SensorNames.WINDDIRECTION, new Sensor(SensorNames.WINDDIRECTION, undefined, undefined, "weather-windy"));
  sensors.set(
    SensorNames.WINDDIRECTION_AVG10M,
    new Sensor(SensorNames.WINDDIRECTION_AVG10M, undefined, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDDIRECTION_AVG2M,
    new Sensor(SensorNames.WINDDIRECTION_AVG2M, undefined, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDGUST,
    new Sensor(SensorNames.WINDGUST, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDMAXDAILYGUST,
    new Sensor(SensorNames.WINDMAXDAILYGUST, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDSPEED,
    new Sensor(SensorNames.WINDSPEED, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDSPEED_AVG10M,
    new Sensor(SensorNames.WINDSPEED_AVG10M, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );
  sensors.set(
    SensorNames.WINDSPEED_AVG2M,
    new Sensor(SensorNames.WINDSPEED_AVG2M, SensorUnit.milesPerHour, undefined, "weather-windy"),
  );

  sensors.set(SensorNames.UV, new Sensor(SensorNames.UV, undefined, undefined, "weather-sunny"));
}

export function discoverAll(): Promise<IPublishPacket[]> {
  const promises = new Array<Promise<IPublishPacket>>();

  sensors.forEach((value) => {
    promises.push(value.publishDiscovery());
  });

  return Promise.all(promises);
}

export function publishAll(): Promise<IPublishPacket[]> {
  const promises = new Array<Promise<IPublishPacket>>();

  sensors.forEach((value) => {
    promises.push(value.publishData());
  });

  return Promise.all(promises);
}
