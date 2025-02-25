# ambientweather2mqtt - Convert Ambient Weather data to MQTT messages

This package listens for local data from Ambient Weather stations (such as the WS-2902C) and converts the incoming data to MQTT events. The sensor data is published with auto-discovery so they show up automatically as sensors in Home Assistant.

The following Ambient Weather station models are confirmed to work: WS-2902C.

- [Installation and configuration](#installation-and-configuration)
  - [Setting up the Docker image](#setting-up-the-docker-image)
  - [Setting up HomeAssistant Addon (only for non-native Docker installs)](#setting-up-homeassistant-addon-only-for-non-native-docker-installs)
  - [Configuring the weather station](#configuring-the-weather-station)
- [Verifying everything works](#verifying-everything-works)
- [Troubleshooting](#troubleshooting)
- [Advanced settings](#advanced-settings)
- [Supported sensors](#supported-sensors)
- [Calculated sensors](#calculated-sensors)

## Installation and configuration

### Setting up the Docker image

The package is provided as a Docker image for ease of installation. The
[sampleConfiguration](sampleConfiguration/) folder contains the two files necessary
for setup.

1. Copy the [sampleConfiguration/.env](sampleConfiguration/.env) and
   [sampleConfiguration/docker-compose.yml](sampleConfiguration/docker-compose.yml)
   file to your local machine.
2. Edit the `.env` file and specify the required information. At a minimum you
   must provide the address of your MQTT server, your Ambient Weather station's MAC
   address, and the timezone your station is located in. The sample `.env` contains
   comments explaining the additional options available including username and password for connecting to the MQTT server.
3. Start up the service by running `docker-compose up` in the same folder as two downloaded configuration files.

If the server starts up successfully you will see log messages like this:

```console
2021-06-30T05:59:56-07:00 [Main] Starting up
2021-06-30T05:59:56-07:00 [MQTT] Connected to MQTT server http://192.168.1.172:1883
2021-06-30T05:59:56-07:00 [Web server] Listening at http://localhost:8080
```

### Setting up HomeAssistant Addon (only for non-native Docker installs)

[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fneilenns%2Fambientweather2mqtt)

Add `https://github.com/neilenns/ambientweather2mqtt` as an add-on repository.

### Configuring the weather station

Your Ambient Weather station must be configured to send data to the local service. This configuration is done through the [`awnet`](https://apps.apple.com/us/app/awnet/id1341994564) app. It is recommended to use an iOS device, but some have found success using an Android device as well.

1. Run the `awnet` app and connect to your weather station.
2. Tap `next` through the configuration screens until you get to the `Customized`
   screen.
3. Set the fields to the values in the following table.
4. Tap `Save`.

| Field                 | Value                                                           | Notes                                                                                                                                                                                                                  |
| --------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enable/Disable        | Enable                                                          | Make sure to set this to `Enable` otherwise no data will get sent.                                                                                                                                                     |
| Protocol Type Same As | Ambient Weather or Weather Underground                          | Ambient Weather supports more sensor data and is preferred. Select Weather Underground only if using a weather station that doesn't support Ambient Weather.                                                           |
| Server IP / Hostname  | The IP or hostname for the machine running the Docker container |                                                                                                                                                                                                                        |
| Path                  | `/data/?`                                                       | **It is very important this field is entered exactly as shown. Be very careful to include the `?` at the end otherwise nothing will work.**                                                                            |
| Station ID            | Any non-blank value                                             | Only required when the protocol is set to Weather Underground. The actual value provided doesn't matter but something must be in the field.                                                                            |
| Station Key           | Any non-blank value                                             | Only required when the protocol is set to Weather Underground. The actual value provided doesn't matter but something must be in the field.                                                                            |
| Port                  | The port specified in the `.env` file                           | If running in Home Assistant this should be set to `7000`. If running the standalone Docker image the sample `.env` file provided uses `8132` so unless you changed it to something else you should enter `8132` here. |
| Upload Interval       | The frequency to send the data.                                 | `30` is a reasonable value to start with.                                                                                                                                                                              |

Here is what a properly configured weather station looks like:

![Screenshot of the awnet app showing the fields filled in as described in the previous table](docs/awnet_settings.jpg)

## Verifying everything works

To verify everything works connect to your Home Assistant server and go to
_Configuration_ > _Devices_ and search for _ambientweather2mqtt_. You should
see a list of all the sensors with current values reported.

![Screenshot of Home Assistant showing the ambientweather2mqtt device](docs/home_assistant_device.png)

## Troubleshooting

If you see the list of sensors but they all report `Unavailable` for the value it
means the data from the weather station is not being received by this system.
Check the following:

1. The `Server IP / Hostname` value was set to the correct IP address for the Docker
   system.
2. The `Port` value was set to the same value specified in `.env`.
3. The `Path` value was set to `/data/?` **with the question mark at the end**. If the question mark is missing the system will not work.
4. Your firewall rules aren't blocking communication from your weather station
   to your Docker server. This can happen if you run virtual LANs to segment NoT/IoT
   traffic from your primarily LAN.

## Advanced settings

If you plan to use this as a Docker deployment but are not using HomeAssistant you may want to change the root used for the topic
in all the MQTT messages. By default the messages are under `homeassistant` to ensure things like auto-discovery work. To change
that you can set the `TOPIC_ROOT` environment variable.

To control the log level set the `LOG_LEVEL` environment variable to one of `error`, `warn`, `info`, `http`, or `debug`. `info` is the default.

## Supported sensors

The following sensors are supported. Note that weather stations will only report the subset of these they support.

| Name                          | Description                                                         | Ambient Weather                                     | Weather Underground | Unit    |
| ----------------------------- | ------------------------------------------------------------------- | --------------------------------------------------- | ------------------- | ------- |
| barometricPressureAbsolute    | Absolute barometric pressure                                        | Yes                                                 | Yes                 | inHg    |
| barometricPressureRelative    | Relative barometric pressure                                        | Yes                                                 | Yes                 | inHg    |
| battery1..10                  | State of battery, `0` for not ok, `100` for ok                      | Yes                                                 | No                  | percent |
| batteryCo2Ok                  | State of the CO2 device battery, `0` for not ok, `100` for ok       | Yes                                                 | No                  | percent |
| batteryOk                     | State of the device battery, `0` for not ok, `100` for ok           | Yes                                                 | No                  | percent |
| batteryPM25Ok                 | State of the PM25 device battery, `0` for not ok, `100` for ok      | Yes                                                 | No                  | percent |
| batteryLightning              | State of the lightning device battery, `0` for not ok, `100` for ok | Yes                                                 | No                  | percent |
| co2                           | CO2 meter reading                                                   | Yes                                                 | No                  | ppm     |
| co2_in                        | Indoor CO2 meter reading                                            | Yes                                                 | No                  | ppm     |
| co2_in_24h                    | Indoor CO2 meter 24 hour average                                    | Yes                                                 | No                  | ppm     |
| dewpoint                      | Outdoor dewpoint temperature                                        | No                                                  | Yes                 | °F      |
| eventDate                     | Date of the latest measurements                                     | Yes                                                 | Yes                 | date    |
| humidity1..10                 | Humidity sensors 1 through 10                                       | Yes                                                 | No                  | percent |
| humidityIndoor                | Indoor humidity                                                     | Yes                                                 | Yes                 | percent |
| humidityOutdoor               | Outdoor humidity                                                    | Yes                                                 | Yes                 | percent |
| lightningCount                | number                                                              | Number of lightning strikes per day                 | Yes                 | No      |
| lightningTime                 | date                                                                | Date and time of the last recorded lightning strike | Yes                 | No      |
| lightningDistance             | km                                                                  | Distance of last strike                             | Yes                 | No      |
| pm25                          | PM2.5 air quality                                                   | Yes                                                 | No                  | µg/m^3  |
| pm25_24Hour                   | PM2.5 air quality 24 hour average                                   | Yes                                                 | No                  | µg/m^3  |
| pm25Indoor                    | PM2.5 indoor air quality                                            | Yes                                                 | No                  | µg/m^3  |
| pm25Indoor_24Hour             | PM2.5 indoor air quality 24 hour average                            | Yes                                                 | No                  | µg/m^3  |
| rain24Hour                    | 24 hour rain                                                        | Yes                                                 | No                  | inches  |
| rainDaily                     | Daily rain                                                          | Yes                                                 | Yes                 | inches  |
| rainEvent                     | Event rain                                                          | Yes                                                 | No                  | inches  |
| rainHourly                    | Hourly rain                                                         | Yes                                                 | Yes                 | in/h    |
| rainMonthly                   | Monthly rain                                                        | Yes                                                 | Yes                 | inches  |
| rainTotal                     | Total rain since last factory reset                                 | Yes                                                 | No                  | inches  |
| rainWeekly                    | Weekly rain                                                         | Yes                                                 | Yes                 | inches  |
| rainYearly                    | Yearly rain                                                         | Yes                                                 | Yes                 | inches  |
| relay1..10                    | Relays 1 through 10                                                 | Yes                                                 | No                  | n/a     |
| soilHumidity1..10             | Soil humidity sensors 1 through 10                                  | Yes                                                 | No                  | percent |
| soilTemperature1..10          | Soil temperature sensors 1 through 10                               | Yes                                                 | No                  | °F      |
| solarRadiation                | Solar radiation                                                     | Yes                                                 | Yes                 | W/m^2   |
| temperature1..10              | Temperature sensors 1 through 10                                    | Yes                                                 | No                  | °F      |
| temperatureIndoor             | Indoor temperature                                                  | Yes                                                 | Yes                 | °F      |
| temperatureOutdoor            | Outdoor temperature                                                 | Yes                                                 | Yes                 | °F      |
| uv                            | UV radiation index                                                  | Yes                                                 | Yes                 | integer |
| windchill                     | Outdoor windchill temperature                                       | No                                                  | Yes                 | °F      |
| windDirection                 | Instantaneous wind direction                                        | Yes                                                 | Yes                 | degree  |
| windDirectionTenMinuteAverage | Wind direction ten minute average                                   | Yes                                                 | No                  | degree  |
| windDirectionTwoMinuteAverage | Wind direction two minute average                                   | Yes                                                 | No                  | degree  |
| windGust                      | Maximum wind speed in the last 10 minutes                           | Yes                                                 | Yes                 | mph     |
| windMaxDailyGust              | Maximum wind speed in last day                                      | Yes                                                 | No                  | mph     |
| windSpeed                     | Instantaneous wind speed                                            | Yes                                                 | Yes                 | mph     |
| windSpeedTenMinuteAverage     | Wind speed ten minute average                                       | Yes                                                 | No                  | mph     |
| windSpeedTwoMinuteAverage     | Wind speed two minute average                                       | Yes                                                 | No                  | mph     |
| aqi_pm25_aqin                 | PM2.5 air quality                                                   | Yes                                                 | No                  | µg/m^3  |
| aqi_pm25_24h_aqin             | PM2.5 air quality 24 hour average                                   | Yes                                                 | No                  | µg/m^3  |
| pm25_in_aqin                  | PM2.5 indoor air quality                                            | Yes                                                 | No                  | µg/m^3  |
| pm25_in_24h_aqin              | PM2.5 indoor air quality 24 hour average                            | Yes                                                 | No                  | µg/m^3  |
| pm10_in_aqin                  | PM1.0 indoor air quality                                            | Yes                                                 | No                  | µg/m^3  |
| pm10_in_24h_aqin              | PM1.0 indoor air quality 24 hour average                            | Yes                                                 | No                  | µg/m^3  |
| pm_in_humidity_aqin           | Indoor humidity                                                     | Yes                                                 | Yes                 | percent |
| pm_in_temp_aqin               | Indoor temperature                                                  | Yes                                                 | No                  | °F      |
| co2_in_aqin                   | Indoor CO2 meter reading                                            | Yes                                                 | No                  | ppm     |
| co2_in_24h_aqin               | Indoor CO2 meter reading 24 hour average                            | Yes                                                 | No                  | ppm     |

## Calculated sensors

The following sensors are calculated using values from the weather station. Note that these will only be sent if the underlying values used for the calculation are available.

| Name              | Description                                                    | Ambient Weather | Weather Underground | Unit      |
| ----------------- | -------------------------------------------------------------- | --------------- | ------------------- | --------- |
| dewpoint          | Outdoor dewpoint temperature                                   | Yes             | No                  | °F        |
| dewpoint1..10     | Outdoor dewpoint temperature for sensors 1 through 10          | Yes             | Yes                 | °F        |
| feelsLike         | Windchill, heat index, or temperature                          | Yes             | Yes                 | °F        |
| feelsLike1..10    | Windchill, heat index, or temperature for sensors 1 through 10 | Yes             | Yes                 | °F        |
| lastRain          | Last time hourlyRain was > 0                                   | Yes             | Yes                 | timestamp |
| solarRadiationLux | Solar radiation (in lux)                                       | Yes             | Yes                 | lx        |
