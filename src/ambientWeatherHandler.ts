/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import express from "express";
import * as log from "./log";

// Sample URL: GET /data/stationtype=AMBWeatherV4.2.9&PASSKEY=<MAC_ADDRESS>&dateutc=2021-03-19+20:20:12&tempinf=70.3&humidityin=29&baromrelin=29.900&
// baromabsin=24.756&tempf=62.8&battout=1&humidity=31&winddir=188&windspeedmph=1.1&windgustmph=3.4&maxdailygust=5.8&hourlyrainin=0.000&eventrainin=0.000&dailyrainin=0.000&
// weeklyrainin=0.000&monthlyrainin=0.000&totalrainin=0.000&solarradiation=622.94&uv=6&batt_co2=1

export function processAmbientWeatherData(req: express.Request, res: express.Response): void {
  log.info("ambientWeatherHandler", `${req.query.stationtype}`);
  log.info("ambientWeatherHandler", `${req.query.PASSKEY}`);
  log.info("ambientWeatherHandler", `${req.query.dateutc}`);
  log.info("ambientWeatherHandler", `${req.query.tempinf}`);
  log.info("ambientWeatherHandler", `${req.query.humidityin}`);
  log.info("ambientWeatherHandler", `${req.query.baromrelin}`);
  log.info("ambientWeatherHandler", `${req.query.baromabsin}`);
  log.info("ambientWeatherHandler", `${req.query.tempf}`);
  log.info("ambientWeatherHandler", `${req.query.battout}`);
  log.info("ambientWeatherHandler", `${req.query.humidity}`);
  log.info("ambientWeatherHandler", `${req.query.winddir}`);
  log.info("ambientWeatherHandler", `${req.query.windspeed}`);
  log.info("ambientWeatherHandler", `${req.query.windgustmph}`);
  log.info("ambientWeatherHandler", `${req.query.maxdailygust}`);
  log.info("ambientWeatherHandler", `${req.query.hourlyrainin}`);
  log.info("ambientWeatherHandler", `${req.query.eventrainin}`);
  log.info("ambientWeatherHandler", `${req.query.maxdailygust}`);
  log.info("ambientWeatherHandler", `${req.query.dailyrainin}`);
  log.info("ambientWeatherHandler", `${req.query.weeklyrainin}`);
  log.info("ambientWeatherHandler", `${req.query.dailyrainin}`);
  log.info("ambientWeatherHandler", `${req.query.weeklyrainin}`);
  log.info("ambientWeatherHandler", `${req.query.monthlyrainin}`);
  log.info("ambientWeatherHandler", `${req.query.totalrainin}`);
  log.info("ambientWeatherHandler", `${req.query.solarradiation}`);
  log.info("ambientWeatherHandler", `${req.query.uv}`);
  log.info("ambientWeatherHandler", `${req.query.batt_co2}`);

  res.status(200).send("OK");
}
