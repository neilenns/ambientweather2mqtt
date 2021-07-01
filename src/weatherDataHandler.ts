/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import express from "express";
import * as mqttManager from "./mqttManager";
import * as sensors from "./sensors";
import * as log from "./log";
import SensorNames from "./sensorNames";
import SensorDataPayload from "./SensorDataPayload";

/**
 * Converts an Ambient Weather "ok" or "not ok" battery value into a 100 or 0 percent value for Home Assistant.
 * @param The raw battery value, either 0 or 1
 * @returns The converted battery value, either 0 or 100.
 */
function convertBatteryValue(value: string): number {
  // This data isn't provided in the Weather Underground API format and many of the Ambient Weather battery sensors
  // don't report data unless there are external devices attached so there's an initial check for undefined to ensure
  // no value gets set for these sensors when there is no data provided.
  if (value === undefined) {
    return undefined;
  }

  return +value ? 100 : 0;
}

/**
 * Sets the data payload on a sensor
 * @param key The sensor to set the data on
 * @param value The data to set
 */
function setDataPayload(key: string, value: SensorDataPayload) {
  if (value === undefined || isNaN(+value)) {
    // log.verbose("Weather handler", `No data received for ${key}, skipping sensor.`);
    return;
  }

  sensors.sensors.get(key).value = value;
}

// Sample Ambient Weather call:
// /data/?stationtype=AMBWeatherV4.2.9&PASSKEY=40:F5:20:3A:40:FF&dateutc=2021-07-01+20:34:06&tempinf=73.0&humidityin=56&baromrelin=29.900&
// baromabsin=29.513&tempf=68.2&battout=1&humidity=66&winddir=358&windspeedmph=0.0&windgustmph=0.0&maxdailygust=3.4&hourlyrainin=0.000&
// eventrainin=0.000&dailyrainin=0.000&weeklyrainin=0.000&monthlyrainin=0.000&totalrainin=0.000&solarradiation=93.58&uv=0&batt_co2=1

// Documentation for the APIs:
// Ambient Weather: https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs
// Weather Underground: https://support.weather.com/s/article/PWS-Upload-Protocol?language=en_US
export function processWeatherData(req: express.Request, res: express.Response): void {
  if (!req.query) {
    log.warn("Weather handler", "No data received, skipping processing the request.");
    return;
  }

  log.verbose("Weather handler", req.url);
  log.verbose("Weather handler", JSON.stringify(req.query, null, 2));

  setDataPayload(SensorNames.BAROMETRICPRESSUREABSOLUTE, +(req.query.baromabsin ?? req.query.absbaromin));
  setDataPayload(SensorNames.BAROMETRICPRESSURERELATIVE, +(req.query.baromrelin ?? req.query.baromin));
  setDataPayload(SensorNames.BATTERY1, convertBatteryValue(req.query.batt1 as string));
  setDataPayload(SensorNames.BATTERY10, convertBatteryValue(req.query.batt10 as string));
  setDataPayload(SensorNames.BATTERY2, convertBatteryValue(req.query.batt2 as string));
  setDataPayload(SensorNames.BATTERY3, convertBatteryValue(req.query.batt3 as string));
  setDataPayload(SensorNames.BATTERY4, convertBatteryValue(req.query.batt4 as string));
  setDataPayload(SensorNames.BATTERY5, convertBatteryValue(req.query.batt5 as string));
  setDataPayload(SensorNames.BATTERY6, convertBatteryValue(req.query.batt6 as string));
  setDataPayload(SensorNames.BATTERY7, convertBatteryValue(req.query.batt7 as string));
  setDataPayload(SensorNames.BATTERY8, convertBatteryValue(req.query.batt8 as string));
  setDataPayload(SensorNames.BATTERY9, convertBatteryValue(req.query.batt9 as string));
  setDataPayload(SensorNames.BATTERYCO2OK, convertBatteryValue(req.query.batt_co2 as string));
  setDataPayload(SensorNames.BATTERYOK, convertBatteryValue(req.query.battout as string));
  setDataPayload(SensorNames.BATTERYPM25, convertBatteryValue(req.query.batt_25 as string));
  setDataPayload(SensorNames.CO2, +req.query.co2);
  setDataPayload(SensorNames.DATE, new Date(req.query.dateutc?.toString()));
  setDataPayload(SensorNames.DEWPOINT, +req.query.dewptf); // Only available in Weather Underground updates
  setDataPayload(SensorNames.HUMIDITY1, +req.query.humidity1);
  setDataPayload(SensorNames.HUMIDITY10, +req.query.humidity10);
  setDataPayload(SensorNames.HUMIDITY2, +req.query.humidity2);
  setDataPayload(SensorNames.HUMIDITY3, +req.query.humidity3);
  setDataPayload(SensorNames.HUMIDITY4, +req.query.humidity4);
  setDataPayload(SensorNames.HUMIDITY5, +req.query.humidity5);
  setDataPayload(SensorNames.HUMIDITY6, +req.query.humidity6);
  setDataPayload(SensorNames.HUMIDITY7, +req.query.humidity7);
  setDataPayload(SensorNames.HUMIDITY8, +req.query.humidity8);
  setDataPayload(SensorNames.HUMIDITY9, +req.query.humidity9);
  setDataPayload(SensorNames.HUMIDITYINDOOR, +(req.query.humidityin ?? req.query.indoorhumidity));
  setDataPayload(SensorNames.HUMIDITYOUTDOOR, +req.query.humidity);
  setDataPayload(SensorNames.PM25, +req.query.pm25);
  setDataPayload(SensorNames.PM25_24HOUR, +req.query.pm25_24h);
  setDataPayload(SensorNames.PM25INDOOR, +req.query.pm25_in);
  setDataPayload(SensorNames.PM25INDOOR_24HOUR, +req.query.pm25_in_24h);
  setDataPayload(SensorNames.RAIN24HOUR, +req.query["24hourrainin"]);
  setDataPayload(SensorNames.RAINDAILY, +(req.query.dailyrainin ?? req.query.rainin));
  setDataPayload(SensorNames.RAINEVENT, +req.query.eventrainin);
  setDataPayload(SensorNames.RAINHOURLY, +req.query.hourlyrainin);
  setDataPayload(SensorNames.RAINMONTHLY, +req.query.monthlyrainin);
  setDataPayload(SensorNames.RAINTOTAL, +req.query.totalrainin);
  setDataPayload(SensorNames.RAINWEEKLY, +req.query.weeklyrainin);
  setDataPayload(SensorNames.SOILHUMIDITY1, +req.query.soilhum1);
  setDataPayload(SensorNames.SOILHUMIDITY10, +req.query.soilhum10);
  setDataPayload(SensorNames.SOILHUMIDITY2, +req.query.soilhum2);
  setDataPayload(SensorNames.SOILHUMIDITY3, +req.query.soilhum3);
  setDataPayload(SensorNames.SOILHUMIDITY4, +req.query.soilhum4);
  setDataPayload(SensorNames.SOILHUMIDITY5, +req.query.soilhum5);
  setDataPayload(SensorNames.SOILHUMIDITY6, +req.query.soilhum6);
  setDataPayload(SensorNames.SOILHUMIDITY7, +req.query.soilhum7);
  setDataPayload(SensorNames.SOILHUMIDITY8, +req.query.soilhum8);
  setDataPayload(SensorNames.SOILHUMIDITY9, +req.query.soilhum9);
  setDataPayload(SensorNames.SOILTEMPERATURE1, +req.query.soiltemp1f);
  setDataPayload(SensorNames.SOILTEMPERATURE10, +req.query.soiltemp10f);
  setDataPayload(SensorNames.SOILTEMPERATURE2, +req.query.soiltemp2f);
  setDataPayload(SensorNames.SOILTEMPERATURE3, +req.query.soiltemp3f);
  setDataPayload(SensorNames.SOILTEMPERATURE4, +req.query.soiltemp4f);
  setDataPayload(SensorNames.SOILTEMPERATURE5, +req.query.soiltemp5f);
  setDataPayload(SensorNames.SOILTEMPERATURE6, +req.query.soiltemp6f);
  setDataPayload(SensorNames.SOILTEMPERATURE7, +req.query.soiltemp7f);
  setDataPayload(SensorNames.SOILTEMPERATURE8, +req.query.soiltemp8f);
  setDataPayload(SensorNames.SOILTEMPERATURE9, +req.query.soiltemp9f);
  setDataPayload(SensorNames.SOLARRADIATION, +req.query.solarradiation);
  setDataPayload(SensorNames.TEMPERATUREINDOOR, +(req.query.tempinf ?? req.query.indoortempf));
  setDataPayload(SensorNames.TEMPERATUREOUTDOOR, +req.query.tempf);
  setDataPayload(SensorNames.UV, +req.query.uv);
  setDataPayload(SensorNames.WINDCHILL, +req.query.windchillf); // Only available in Weather Underground updates
  setDataPayload(SensorNames.WINDDIRECTION, +req.query.winddir);
  setDataPayload(SensorNames.WINDGUST, +req.query.windgustmph);
  setDataPayload(SensorNames.WINDMAXDAILYGUST, +req.query.maxdailygust);
  setDataPayload(SensorNames.WINDSPEED, +req.query.windspeedmph);

  sensors.publishAll();
  mqttManager.publishOnline();

  res.status(200).send("Ok");
}
