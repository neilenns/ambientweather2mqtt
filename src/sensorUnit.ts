/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Source: https://github.com/home-assistant/core/blob/d7ac4bd65379e11461c7ce0893d3533d8d8b8cbf/homeassistant/const.py#L384
enum SensorUnit {
  F = "°F",
  illuminance = "lx",
  inches = "in",
  inchesPerHour = "in/h",
  inHg = "inHg",
  milesPerHour = "mph",
  particulate = "µg/m^3",
  partsPerMillion = "ppm",
  percent = "%",
  radiation = "W/m^2",
  timestamp = "timestamp",
  none = "None",
  kilometers = "km",
}

export default SensorUnit;
