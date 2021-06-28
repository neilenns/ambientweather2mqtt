/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

enum SensorNames {
  TEMPERATUREOUTDOOR = "temperatureOutdoor",
  TEMPERATUREINDOOR = "temperatureIndoor",
  WINDGUST = "windGust",
  WINDSPEED = "windSpeed",
  WINDMAXDAILYGUST = "windMaxDailyGust",
  HUMIDITYOUTDOOR = "humidityOutdoor",
  HUMIDITYINDOOR = "humidityIndoor",
  BAROMETRICPRESSURERELATIVE = "barometricPressureRelative",
  BAROMETRICPRESSUREABSOLUTE = "barometricPressureAbsolute",
  RAINHOURLY = "rainHourly",
  RAINEVENT = "rainEvent",
  RAINDAILY = "rainDaily",
  RAINWEEKLY = "rainWeekly",
  RAINMONTHLY = "rainMonthly",
  RAINTOTAL = "rainTotal",
  SOLARRADIATION = "solarRadiation",
  UV = "uv",
  DATE = "dateUtc",
  BATTERYOK = "batteryOk",
  BATTERYCO2OK = "batteryCo2Ok",
}

export default SensorNames;
