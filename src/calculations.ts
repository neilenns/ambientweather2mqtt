import { isNumber } from "./utilities";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Converts solar radiation to solar radiation in lux
 * @param radiation The solar radiation
 * @returns The solar radiation in lux
 */
export function calculateSolarRadiationLux(radiation: number): number {
  if (!isNumber(radiation)) {
    return undefined;
  }

  return radiation / 0.0079;
}

// Returns the current date if rainAmount is greater than 0. Otherwise
// returns undefined.
/**
 *
 * @param rainAmount The amount of rain in the last hour
 * @returns The current time if the rain amount last hour was more than 0. Otherwise returns undefined.
 */
export function calculateLastRain(rainAmountLastHour: number): Date {
  if (!isNumber(rainAmountLastHour)) {
    return undefined;
  }

  // See https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs#data-timing
  if (rainAmountLastHour > 0) {
    return new Date();
  } else {
    return undefined;
  }
}

// Returns the wind chill value for the given temperature and wind speed.
/**
 * Calculates the wind chill value for the given temperature and wind speed. If the
 * wind chill calculation isn't appropriate (temperature >= 50 or wind speed < 3)
 * returns undefined.
 * @param temperature The current temperature in F
 * @param windSpeed The current wind speed
 * @returns The wind chill in F, if appropriate, or undefined
 */
export function calculateWindChill(temperature: number, windSpeed: number): number {
  // Wind chill is only valid for temperatures lower than 50F
  if (temperature >= 50) {
    return undefined;
  }

  // Wind chill is only valid for wind speeds 3mph or higher
  if (windSpeed < 3) {
    return undefined;
  }

  // Formula from https://www.wpc.ncep.noaa.gov/html/windchill.shtml
  const windChill = 35.74 + 0.6215 * temperature - 35.75 * windSpeed ** 0.16 + 0.4275 * temperature * windSpeed ** 0.16;

  return windChill;
}

// Returns the heat index value for the given temperature and relative humidity.
/**
 * Calcluates the heat index value for the given tempearture and humidity. If
 * the heat index calculation isn't appropriate (temperature < 69) returns undefined.
 * @param temperature The current temperature in F
 * @param relativeHumidity The current relative humidity
 * @returns The heat index in F, if appropriate, or undefined
 */
export function calculateHeatIndex(temperature: number, relativeHumidity: number): number {
  // Heat index only valid for temperatures above 68F
  if (temperature <= 68) {
    return undefined;
  }

  // Heat index calculation from https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
  // Try the simple formula first. If the average of the temperature and the simple calculated
  // heat index is < 80F then it can be used.
  let heatIndex = 0.5 * (temperature + 61.0 + (temperature - 68.0) * 1.2 + relativeHumidity * 0.094);

  if (heatIndex + temperature / 2 < 80) {
    return heatIndex;
  }

  // At this point the complicated Rothfusz regression is more appropriate so use that
  heatIndex =
    -42.379 +
    2.04901523 * temperature +
    10.14333127 * relativeHumidity -
    0.22475541 * temperature * relativeHumidity -
    0.00683783 * temperature * temperature -
    0.05481717 * relativeHumidity * relativeHumidity +
    0.00122874 * temperature * temperature * relativeHumidity +
    0.00085282 * temperature * relativeHumidity * relativeHumidity -
    0.00000199 * temperature * temperature * relativeHumidity * relativeHumidity;

  if (relativeHumidity < 13 && temperature >= 80 && temperature <= 112) {
    heatIndex = heatIndex - ((13 - relativeHumidity) / 4) * Math.sqrt(Math.abs(17 - (temperature - 95)) / 17);
  } else if (relativeHumidity > 85 && temperature >= 80 && temperature <= 87) {
    heatIndex = heatIndex + ((relativeHumidity - 85) / 10) * ((87 - temperature) / 5);
  }
}

// Returns the current temperature, wind chill (temp < 50F), or heat index (temp > 68F)
/**
 * Returns the wind chill, heat index, or actual current temperature as appropriate given
 * the temperature, wind speed, and humidity.
 * @param temperature The current temperature in F
 * @param windSpeed The current wind speed
 * @param humidity The current humidity
 * @returns The wind chill, heat index, or actual current temperature
 */
export function calculateFeelsLike(temperature: number, windSpeed: number, humidity: number): number {
  if (!isNumber(temperature) || !isNumber(windSpeed) || !isNumber(humidity)) {
    return undefined;
  }

  if (temperature < 50) {
    return calculateWindChill(temperature, windSpeed);
  } else if (temperature > 68) {
    return calculateHeatIndex(temperature, humidity);
  } else {
    return temperature;
  }
}
