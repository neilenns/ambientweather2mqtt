/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import express from "express";
import * as log from "./log";
import { WeatherData } from "./weatherData";

// Sample URL: GET /data/stationtype=AMBWeatherV4.2.9&PASSKEY=<MAC_ADDRESS>&dateutc=2021-03-19+20:20:12&tempinf=70.3&humidityin=29&baromrelin=29.900&
// baromabsin=24.756&tempf=62.8&battout=1&humidity=31&winddir=188&windspeedmph=1.1&windgustmph=3.4&maxdailygust=5.8&hourlyrainin=0.000&eventrainin=0.000&dailyrainin=0.000&
// weeklyrainin=0.000&monthlyrainin=0.000&totalrainin=0.000&solarradiation=622.94&uv=6&batt_co2=1

export function processAmbientWeatherData(req: express.Request, res: express.Response): void {
  const weatherData = {
    stationType: req.query.stationtype,
    MACAddress: req.query.PASSKEY,
    dateUTC: new Date(req.query.dateutc.toString()),
    temperature: +req.query.tempinf,
    humidity: +req.query.humidityin,
    barometricPressureRelative: +req.query.baromrelin,
    barometricPressureAbsolute: +req.query.baromabsin,
    tempf: +req.query.tempf,
    batteryPercent: +req.query.battout,
    humidity2: +req.query.humidity,
    windDirection: +req.query.winddir,
    windSpeed: +req.query.windspeed,
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
    batteryCo2: +req.query.batt_co2,
  } as WeatherData;

  log.info("Weather handler", JSON.stringify(weatherData));

  res.status(200).send("OK");
}
