/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import express from "express";
import * as mqttManager from "./mqttManager";
import * as sensors from "./sensors";
import * as log from "./log";
import ISensorDataPayload from "./ISensorDataPayload";
import SensorNames from "./sensorNames";

// Sample URL: GET /data/stationtype=AMBWeatherV4.2.9&PASSKEY=<MAC_ADDRESS>&dateutc=2021-03-19+20:20:12&tempinf=70.3&humidityin=29&baromrelin=29.900&
// baromabsin=24.756&tempf=62.8&battout=1&humidity=31&winddir=188&windspeedmph=1.1&windgustmph=3.4&maxdailygust=5.8&hourlyrainin=0.000&eventrainin=0.000&dailyrainin=0.000&
// weeklyrainin=0.000&monthlyrainin=0.000&totalrainin=0.000&solarradiation=622.94&uv=6&batt_co2=1

function setDataPayload(key: string, value: string | number | boolean | Date) {
  if (value === undefined) {
    log.warn("Weather handler", `No data received for ${key}, skipping sensor.`);
    return;
  }

  sensors.sensors.get(key).dataPayload = {
    value: value,
  } as ISensorDataPayload;
}

// The definitions for all the incoming properties are indirectly documented
// in the server API docs at https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs
export function processAmbientWeatherData(req: express.Request, res: express.Response): void {
  if (!req.query) {
    log.warn("Weather handler", "No data received, skipping processing the request.");
    return;
  }

  log.verbose("Weather handler", JSON.stringify(req.query, null, 2));

  setDataPayload(SensorNames.BAROMETRICPRESSUREABSOLUTE, +req.query.baromabsin);
  setDataPayload(SensorNames.BAROMETRICPRESSURERELATIVE, +req.query.baromrelin);

  // For the two battery sensors the weather station sends 0 or 1, but for Home Assistant to properly display the icon it should be 0 or 100
  setDataPayload(SensorNames.BATTERYCO2OK, +req.query.batt_co2 ? 100 : 0);
  setDataPayload(SensorNames.BATTERYOK, +req.query.battout ? 100 : 0);

  setDataPayload(SensorNames.DATE, new Date(req.query.dateutc.toString()));
  setDataPayload(SensorNames.HUMIDITYINDOOR, +req.query.humidityin);
  setDataPayload(SensorNames.HUMIDITYOUTDOOR, +req.query.humidity);
  setDataPayload(SensorNames.RAINDAILY, +req.query.dailyrainin);
  setDataPayload(SensorNames.RAINEVENT, +req.query.eventrainin);
  setDataPayload(SensorNames.RAINHOURLY, +req.query.hourlyrainin);
  setDataPayload(SensorNames.RAINMONTHLY, +req.query.monthlyrainin);
  setDataPayload(SensorNames.RAINTOTAL, +req.query.totalrainin);
  setDataPayload(SensorNames.RAINWEEKLY, +req.query.weeklyrainin);
  setDataPayload(SensorNames.SOLARRADIATION, +req.query.solarradiation);
  setDataPayload(SensorNames.TEMPERATUREINDOOR, +req.query.tempinf);
  setDataPayload(SensorNames.TEMPERATUREOUTDOOR, +req.query.tempf);
  setDataPayload(SensorNames.UV, +req.query.uv);
  setDataPayload(SensorNames.WINDDIRECTION, +req.query.winddir);
  setDataPayload(SensorNames.WINDGUST, +req.query.windgustmph);
  setDataPayload(SensorNames.WINDMAXDAILYGUST, +req.query.maxdailygust);
  setDataPayload(SensorNames.WINDSPEED, +req.query.windspeedmph);

  sensors.publishAll();
  mqttManager.publishOnline();

  res.status(200).send("Ok");
}
