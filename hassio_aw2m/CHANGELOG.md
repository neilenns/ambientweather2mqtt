# Version

## 4.8.0

* Add `co2_in` and `co2_in_24h` sensors (Fixes [#160](https://github.com/neilenns/ambientweather2mqtt/issues/160))
* Update dependencies

## 4.7.0

* Add `aqi_pm25_in` and `aqi_pm25_in_24h` sensors. (Fixes [#158](https://github.com/neilenns/ambientweather2mqtt/issues/158))
* Add `PUBLISH_NAME` environment variable to set the name the topics are published with. (Fixes [#157](https://github.com/neilenns/ambientweather2mqtt/issues/157))

## 4.6.0

* Add retain flag for `lastRain` sensor and new environment variable for enabling retain of all sensor values. (Fixes [#152](https://github.com/neilenns/ambientweather2mqtt/issues/152))

## 4.5.1

* Remove bashio calls from HomeAssistant add-on. (Fixes [[#147](https://github.com/neilenns/ambientweather2mqtt/issues/147)])

## 4.5.0

* Add more logging options to help identify reported issues. (Fixes [#145](https://github.com/neilenns/ambientweather2mqtt/issues/145))
* Add more robust environment variable validation. (Fixes [#143](https://github.com/neilenns/ambientweather2mqtt/issues/143))

## 4.4.2

* Send lastRain timestamp in the correct format for HomeAssistant. (Fixes [#138](https://github.com/neilenns/ambientweather2mqtt/issues/138))
* Update dependencies

## 4.4.1

* Address an issue with `OBSERVERIP2_V2.2.6` weather stations sending garbage at the end of the data feed. (Fixes issue [#136](https://github.com/neilenns/ambientweather2mqtt/issues/136))

## 4.4.0

* Add new calculated sensors: `dewpoint`, `dewpoint1..10`,`feelsLike`, `feelsLike1..10`, `lastRain`, and `solar_radiation_lux`. (Fixes issue [#125](https://github.com/neilenns/ambientweather2mqtt/issues/125))
* Add `diagnostic` entity category to all battery sensors (Fixes issue [#129](https://github.com/neilenns/ambientweather2mqtt/issues/129))

## 4.3.2

* Change units for all CO2 sensors to `ppm`. (Fixes issue [#122](https://github.com/neilenns/ambientweather2mqtt/issues/122))

## 4.3.1

* Resolve a warning in HomeAssistant logs (Fixes issue [#119](https://github.com/neilenns/ambientweather2mqtt/issues/119))

## 4.3.0

* Add support for AQIN indoor sensor

## 4.2.0

Add support for Ambient Weather lightning sensor.

## 4.1.1

* Update dependencies

## 4.1.0

* Add an environment variable to set the root topic (Fixes issue #110)

## 4.0.4

* Handle invalid event dates being provided by buggy AmbientWeather stations. (Fixes issue #106)

## 4.0.3

Fix issue #99, which was causing exceptions in the Home Assistant logs starting with release 2023.5.0:

* Remove the sensor measurement unit for `EventDate`.
* Change the date format for `EventDate` data to ISO standard format.

## 4.0.2

* Change the sensor measurement unit for `EventDate` from `timestamp` to `None` in an attempt to fix an issue with Home Assistant version 2023.5.0.

## 4.0.1

* Change the sensor class for EventDate from `unknown` to `timestamp` in an attempt to fix an issue with Home Assistant version 2023.5.0.

## 4.0.0

* Rename the temperature unit from `˚F` to `°F` for compatibility with Home Assistant. Since the name of the
unit changed this is a breaking change.

## 3.0.4

* Update a dependency. No functional changes.

## 3.0.3

* Add support for tracking long-term statistics

## 3.0.2

* Add missing temperature values for stations with more than one temperature sensor

## 3.0.1

* Update dependencies

## 3.0.0

* Hourly Rain unit of measurement corrected. This was a breaking change, it is now reported in `in/h` instead of `inches`.

## 2.1.0

* HomeAssistant add-on support

## 2.0.0

* The `dateUtc` topic is renamed to `entityDate`. This wasa  breaking change. Any automation that used the `dateUtc` topic will need to point to the new `entityDate` topic instead.

## 1.0.0

Initial release of HA addon
