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

/**
 * Sets the data payload on a sensor
 * @param key The sensor to set the data on
 * @param value The data to set
 */
function setDataPayload(key: string, value: string | number | boolean | Date) {
  if (value === undefined || isNaN(+value)) {
    log.verbose("Weather handler", `No data received for ${key}, skipping sensor.`);
    return;
  }

  sensors.sensors.get(key).dataPayload = {
    value: value,
  } as ISensorDataPayload;
}

// Documentation for the APIs:
// Ambient Weather: https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs
// Weather Underground: https://support.weather.com/s/article/PWS-Upload-Protocol?language=en_US
export function processWeatherData(req: express.Request, res: express.Response): void {
  if (!req.query) {
    log.warn("Weather handler", "No data received, skipping processing the request.");
    return;
  }

  log.verbose("Weather handler", JSON.stringify(req.query, null, 2));

  setDataPayload(SensorNames.BAROMETRICPRESSUREABSOLUTE, +(req.query.baromabsin ?? req.query.absbaromin));
  setDataPayload(SensorNames.BAROMETRICPRESSURERELATIVE, +(req.query.baromrelin ?? req.query.baromin));

  // For the two battery sensors the weather station sends 0 or 1, but for Home Assistant to properly display the icon it should be 0 or 100
  setDataPayload(
    SensorNames.BATTERYCO2OK,
    req.query.batt_co2 === undefined ? undefined : +req.query.batt_co2 ? 100 : 0,
  );
  setDataPayload(SensorNames.BATTERYOK, req.query.battout === undefined ? undefined : +req.query.battout ? 100 : 0);

  setDataPayload(SensorNames.DATE, new Date(req.query.dateutc.toString()));
  setDataPayload(SensorNames.DEWPOINT, +req.query.dewptf); // Only available in Weather Underground updates
  setDataPayload(SensorNames.HUMIDITYINDOOR, +(req.query.humidityin ?? req.query.indoorhumidity));
  setDataPayload(SensorNames.HUMIDITYOUTDOOR, +req.query.humidity);
  setDataPayload(SensorNames.RAINDAILY, +(req.query.dailyrainin ?? req.query.rainin));
  setDataPayload(SensorNames.RAINEVENT, +req.query.eventrainin);
  setDataPayload(SensorNames.RAINHOURLY, +req.query.hourlyrainin);
  setDataPayload(SensorNames.RAINMONTHLY, +req.query.monthlyrainin);
  setDataPayload(SensorNames.RAINTOTAL, +req.query.totalrainin);
  setDataPayload(SensorNames.RAINWEEKLY, +req.query.weeklyrainin);
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
