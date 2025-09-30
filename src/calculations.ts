import { isNumber } from "./utilities.js";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Rounds a number to a specified number of digits of precision.
 * @param n The number to round
 * @param digits The digits of precision after the decimal
 * @returns The rounded number
 */
function roundTo(n: number, digits: number): number {
  // Code from https://stackoverflow.com/a/32605063
  if (digits === undefined) {
    digits = 0;
  }

  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
}

function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Converts solar radiation to solar radiation in lux
 * @param radiation The solar radiation
 * @returns The solar radiation in lux
 */
export function calculateSolarRadiationLux(radiation: number): number | undefined {
  if (!isNumber(radiation)) {
    return undefined;
  }

  // Conversion factor from https://github.com/home-assistant/core/blob/dev/homeassistant/components/ambient_station/__init__.py
  return roundTo(radiation / 0.0079, 2);
}

// Returns the current date if rainAmount is greater than 0. Otherwise
// returns undefined.
/**
 *
 * @param rainAmount The amount of rain in the last hour
 * @returns The current time if the rain amount last hour was more than 0. Otherwise returns undefined.
 */
export function calculateLastRain(rainAmountLastHour: number): Date | undefined {
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

/**
 * Calculates the wind chill value for the given temperature and wind speed. If the
 * wind chill calculation isn't appropriate (temperature >= 50 or wind speed < 3)
 * returns undefined.
 * @param temperature The current temperature in F
 * @param windSpeed The current wind speed
 * @returns The wind chill in F, if appropriate, or undefined
 */
export function calculateWindChill(temperature: number, windSpeed: number): number | undefined {
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

  return roundTo(windChill, 2);
}

/**
 * Calcluates the heat index value for the given tempearture and humidity. If
 * the heat index calculation isn't appropriate (temperature < 69) returns undefined.
 * @param temperature The current temperature in F
 * @param relativeHumidity The current relative humidity
 * @returns The heat index in F, if appropriate, or undefined
 */
export function calculateHeatIndex(temperature: number, relativeHumidity: number): number | undefined {
  // Heat index only valid for temperatures above 68F
  if (temperature <= 68) {
    return undefined;
  }

  // Heat index calculation from https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
  // Try the simple formula first. If the average of the temperature and the simple calculated
  // heat index is < 80F then it can be used.
  let heatIndex = 0.5 * (temperature + 61.0 + (temperature - 68.0) * 1.2 + relativeHumidity * 0.094);

  if ((heatIndex + temperature) / 2 < 80) {
    return roundTo(heatIndex, 2);
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

  return roundTo(heatIndex, 2);
}

/**
 * Calculates the wind chill, heat index, or actual current temperature as appropriate given
 * the temperature, wind speed, and humidity.
 * @param temperature The current temperature in F
 * @param windSpeed The current wind speed
 * @param humidity The current humidity
 * @returns The wind chill, heat index, or actual current temperature
 */
export function calculateFeelsLike(temperature: number, windSpeed: number, humidity: number): number | undefined {
  if (!isNumber(temperature) || !isNumber(windSpeed) || !isNumber(humidity)) {
    return undefined;
  }

  if (temperature < 50) {
    return calculateWindChill(temperature, windSpeed) || temperature;
  } else if (temperature > 68) {
    return calculateHeatIndex(temperature, humidity) || temperature;
  } else {
    return temperature;
  }
}

/**
 * Calculates the dewpoint temperature for the given temperature and humidity.
 * @param temperature The current temperature in F
 * @param humidity The current relative humidity
 */
export function calculateDewPoint(temperature: number, humidity: number): number | undefined {
  if (!isNumber(temperature) || !isNumber(humidity)) {
    return undefined;
  }

  // Calculation from https://ag.arizona.edu/azmet/dewpoint.html.
  // The math expects the temperature to be in C, which is not how it comes from the weather station
  const tempInC = fahrenheitToCelsius(temperature);

  const B = (Math.log(humidity / 100) + (17.27 * tempInC) / (237.3 + tempInC)) / 17.27;
  const dewpointInC = (237.3 * B) / (1 - B);

  // Convert back to F so the units match all the other temperature units sent
  return roundTo(celsiusToFahrenheit(dewpointInC), 2);
}
