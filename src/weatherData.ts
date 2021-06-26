/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class WeatherData {
  public stationType: string;
  public MACAddress: string;
  public dateUTC: Date;
  public barometricPressureRelative: number;
  public barometricPressureAbsolute: number;
  public temperatureIndoor: number;
  public temperatureOutdoor: number;
  public batteryOk: boolean;
  public humidityIndoor: number;
  public humidityOutdoor: number;
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
  public batteryCo2Ok: boolean;
}
