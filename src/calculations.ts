/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export function calculateSolarRadiationLux(radiation: number): number {
  return radiation / 0.0079;
}

// See https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs#data-timing
// Returns the current date if rainAmount is greater than 0. Otherwise
// returns undefined.
export function calculateLastRain(rainAmount: number): Date {
  if (rainAmount > 0) {
    return new Date();
  } else {
    return undefined;
  }
}
