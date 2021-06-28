/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import express from "express";
import * as log from "./log";
import { WeatherData } from "./weatherData";
import * as sensors from "./sensors";
import SensorDataPayload from "./sensorDataPayload";
import SensorNames from "./sensorNames";

// Sample URL: GET /data/stationtype=AMBWeatherV4.2.9&PASSKEY=<MAC_ADDRESS>&dateutc=2021-03-19+20:20:12&tempinf=70.3&humidityin=29&baromrelin=29.900&
// baromabsin=24.756&tempf=62.8&battout=1&humidity=31&winddir=188&windspeedmph=1.1&windgustmph=3.4&maxdailygust=5.8&hourlyrainin=0.000&eventrainin=0.000&dailyrainin=0.000&
// weeklyrainin=0.000&monthlyrainin=0.000&totalrainin=0.000&solarradiation=622.94&uv=6&batt_co2=1

function setDataPayload(key: string, value: string | number | boolean) {
  sensors.sensors.get(key).dataPayload = {
    value: value,
  } as SensorDataPayload;

  // const sensor = sensors.sensors.get(key);
  // sensor.dataPayload = { value: value };
  // sensors.sensors.set(key, sensor);
}

// The definitions for all the incoming properties are indirectly documented
// in the server API docs at https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs
export function processAmbientWeatherData(req: express.Request, res: express.Response): void {
  setDataPayload(SensorNames.TEMPERATUREOUTDOOR, +req.query.tempf);
  setDataPayload(SensorNames.TEMPERATUREINDOOR, +req.query.tempinf);
  setDataPayload(SensorNames.HUMIDITYOUTDOOR, +req.query.humidity);
  setDataPayload(SensorNames.HUMIDITYINDOOR, +req.query.humidityin);
  setDataPayload(SensorNames.BAROMETRICPRESSURERELATIVE, +req.query.baromrelin);
  setDataPayload(SensorNames.BAROMETRICPRESSUREABSOLUTE, +req.query.baromabsin);
  setDataPayload(SensorNames.WINDSPEED, +req.query.windspeedmph);
  setDataPayload(SensorNames.WINDGUST, +req.query.windgustmph);
  setDataPayload(SensorNames.WINDMAXDAILYGUST, +req.query.maxdailygust);
  setDataPayload(SensorNames.RAINDAILY, +req.query.dailyrainin);
  setDataPayload(SensorNames.RAINHOURLY, +req.query.hourlyrainin);
  setDataPayload(SensorNames.RAINEVENT, +req.query.eventrainin);
  setDataPayload(SensorNames.RAINWEEKLY, +req.query.weeklyrainin);
  setDataPayload(SensorNames.RAINMONTHLY, +req.query.monthlyrainin);
  setDataPayload(SensorNames.RAINTOTAL, +req.query.totalrainin);

  const weatherData = {
    stationType: req.query.stationtype,
    MACAddress: req.query.PASSKEY,
    dateUTC: new Date(req.query.dateutc.toString()),
    temperatureIndoor: +req.query.tempinf,
    humidityIndoor: +req.query.humidityin,
    barometricPressureRelative: +req.query.baromrelin,
    barometricPressureAbsolute: +req.query.baromabsin,
    temperatureOutdoor: +req.query.tempf,
    batteryOk: !!+req.query.battout, // Convert string to number with +, then number to boolean with !!
    humidityOutdoor: +req.query.humidity,
    windDirection: +req.query.winddir,
    windSpeed: +req.query.windspeedmph,
    windGust: +req.query.windgustmph,
    windMaxDailyGust: +req.query.maxdailygust,
    rainHourly: +req.query.hourlyrainin,
    rainEvent: +req.query.eventrainin,
    rainDaily: +req.query.dailyrainin,
    rainWeekly: +req.query.weeklyrainin,
    rainMonthly: +req.query.monthlyrainin,
    rainTotal: +req.query.totalrainin,
    solarRadiation: +req.query.solarradiation,
    uv: +req.query.uv,
    batteryCo2Ok: !!+req.query.batt_co2, // Convert string to number with +, then number to boolean with !!
  } as WeatherData;

  sensors.publishAll();

  log.info("Weather handler", JSON.stringify(weatherData));
  res.status(200).send("OK");
}
