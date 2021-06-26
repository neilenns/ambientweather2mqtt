/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class WeatherData {
  public stationType: string;
  public MACAddress: string;
  public dateUTC: Date;
  public temperature: number;
  public humidity: number;
  public barometricPressureRelative: number;
  public barometricPressureAbsolute: number;
  public tempf: number;
  public batteryPercent: number;
  public humidity2: number;
  public windDirection: number;
  public windSpeed: number;
  public windGust: number;
  public windMaxDailyGust: number;
  public rainHourly: number;
  public rainEvent: number;
  public rainWeekly: number;
  public rainMonthly: number;
  public rainTotal: number;
  public solarRadiation: number;
  public uv: number;
  public batteryCo2: number;
}
