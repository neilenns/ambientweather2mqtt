# Agent Documentation for ambientweather2mqtt

This document provides essential information for AI coding agents working on this project.

## Project Overview

**ambientweather2mqtt** is a Node.js service that listens for local data from Ambient Weather stations (such as the WS-2902C) and converts it to MQTT events for Home Assistant integration. The sensor data is published with auto-discovery so sensors appear automatically in Home Assistant.

## Tech Stack

- **Language**: TypeScript (compiled to JavaScript)
- **Runtime**: Node.js 14+ (Alpine Linux 3.12 for Docker compatibility)
- **Package Manager**: npm
- **Web Framework**: Express.js
- **MQTT Client**: async-mqtt
- **Testing**: Mocha + Chai
- **Build System**: TypeScript Compiler (tsc)
- **Code Quality**: ESLint + Prettier + Markdownlint
- **Deployment**: Docker, Home Assistant Add-on

## Project Structure

```text
ambientweather2mqtt/
├── src/                          # TypeScript source code
│   ├── main.ts                   # Application entry point
│   ├── env.ts                    # Environment variable validation (Zod schema)
│   ├── webServer.ts              # Express server for receiving weather data
│   ├── mqttManager.ts            # MQTT client and publishing logic
│   ├── entityManager.ts          # Home Assistant entity management
│   ├── sensor.ts                 # Sensor entity class
│   ├── binarySensor.ts           # Binary sensor entity class
│   ├── calculations.ts           # Calculated sensor values (dewpoint, feels like, etc.)
│   ├── entityNames.ts            # Enum of all entity names
│   ├── deviceClass.ts            # Home Assistant device classes
│   ├── sensorUnit.ts             # Sensor units of measurement
│   ├── controllers/              # Express route controllers
│   └── types/                    # TypeScript type definitions
│       └── environment.d.ts      # Process.env type definitions
├── test/                         # Test files
│   ├── calculatedSensors.spec.ts # Tests for calculated sensors
│   └── test.env                  # Test environment variables
├── dist/                         # Compiled JavaScript output (gitignored)
├── hassio_aw2m/                  # Home Assistant add-on files
│   ├── Dockerfile                # Home Assistant-specific Docker image
│   ├── config.yaml               # Add-on configuration
│   ├── startup.sh                # Add-on startup script
│   └── CHANGELOG.md              # Add-on changelog
├── sampleConfiguration/          # Example configuration files
│   ├── .env                      # Sample environment variables
│   └── docker-compose.yml        # Sample Docker Compose setup
├── docs/                         # Documentation assets
├── Dockerfile                    # Main Docker image
├── package.json                  # npm dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── .prettierrc                   # Prettier configuration
├── .markdownlint.json            # Markdownlint configuration
├── .mocharc.jsonc                # Mocha test configuration
├── README.md                     # User documentation
├── DEVELOPMENT.md                # Developer documentation
└── CHANGELOG.md                  # Project changelog
```

## Environment Configuration

Required environment variables (defined in `src/env.ts`):

- `MQTT_SERVER`: MQTT server URL (e.g., `http://192.168.1.1:1883`)
- `STATION_MAC_ADDRESS`: MAC address of the Ambient Weather station
- `TZ`: Timezone (e.g., `America/Los_Angeles`)
- `PORT`: Port for the web server (default: `8132`)

Optional environment variables:

- `MQTT_USERNAME`: MQTT authentication username
- `MQTT_PASSWORD`: MQTT authentication password
- `MQTT_REJECT_UNAUTHORIZED`: TLS certificate validation (`true`|`false`, default: `false`)
- `LOG_LEVEL`: Logging level (`error`|`warn`|`info`|`http`|`debug`|`trace`, default: `info`)
- `LOCALE`: Date/time formatting locale (default: `en-US`)
- `TOPIC_ROOT`: MQTT topic root (optional)
- `PUBLISH_NAME`: Device name for MQTT (default: `ambientWeather2mqtt`)
- `RETAIN_SENSOR_VALUES`: Retain MQTT messages (`true`|`false`, default: `false`)
- `NODE_ENV`: Node environment (default: `production`)
- `VERSION`: Application version (default: `dev`)

Environment variables are validated using Zod schemas in `src/env.ts`.

## Development Workflow

### Initial Setup

```bash
npm install      # Install dependencies and build (runs prepare script)
```

### Building

```bash
npm run build    # Compile TypeScript to dist/
```

TypeScript is compiled to ES modules in the `dist/` directory using the configuration in `tsconfig.json`.

### Testing

```bash
npm test         # Run Mocha tests with test environment
```

Tests are located in the `test/` directory and use Mocha + Chai. Test environment variables are loaded from `test/test.env`.

### Linting

```bash
npm run lint              # Run all linters
npm run lint:eslint       # Run ESLint on TypeScript files
npm run lint:markdown     # Run Markdownlint on Markdown files
npm run format            # Format code with Prettier
```

**Note**: The project currently has a configuration issue - `package.json` references `.eslintrc.json` which doesn't exist. ESLint will fail until this is resolved. The project uses ESLint 9.x which may require a flat config (`eslint.config.js`) instead.

### Running Locally

```bash
# Option 1: Press F5 in VS Code (uses .vscode/launch.json)
# Option 2: Run the compiled code
npm start        # Run dist/main.js

# Option 3: Run with Docker

npm run build:docker
docker-compose up
```

When debugging:

1. Point your Ambient Weather station to your local IP address and the configured port
2. Use `http://localhost:PORT/discover` to trigger auto-discovery messages
3. Send test data: `http://localhost:PORT/data?<urlencoded weather data>`

### Deployment

1. Update `CHANGELOG.md` with changes
2. Run `npm version [major|minor|patch]` to bump version
3. Create a GitHub release (triggers Docker image build)
4. Update `hassio_aw2m/config.yaml` with new version number
5. Update `hassio_aw2m/CHANGELOG.md` with changes
6. Push `hassio_aw2m` changes to main branch

The project is published as:

- npm package: `ambientweather2mqtt`
- Docker image: `ghcr.io/neilenns/ambientweather2mqtt`
- Home Assistant add-on: `https://github.com/neilenns/ambientweather2mqtt`

## Key Architecture Concepts

### Entity Management

- **entityManager.ts**: Manages all Home Assistant entities (sensors, binary sensors)
- **Entity lifecycle**: Initialize → Receive data → Publish to MQTT → Auto-discovered by Home Assistant
- Each sensor has a unique name, device class, unit, and icon
- Supports 100+ sensor types including weather, air quality (AQIN), CO2, and relay sensors

### Data Flow

1. Weather station sends HTTP GET request to `/data` endpoint
2. Express server receives query parameters with sensor data
3. Data is validated and processed
4. Calculated sensors are computed (dewpoint, feels like, solar radiation lux)
5. Entity values are updated
6. MQTT messages are published to Home Assistant
7. Home Assistant auto-discovers and displays sensors

### MQTT Topics

- Discovery: `homeassistant/sensor/{deviceId}/{sensorName}/config`
- State: `homeassistant/sensor/{deviceId}/{sensorName}/state`

### Calculated Sensors

The system calculates additional sensor values from raw data:

- Dewpoint (indoor and outdoor)
- Feels like temperature (wind chill or heat index)
- Solar radiation in lux
- Last rain timestamp

## Common Development Tasks

### Adding a New Sensor

1. Add sensor name to `entityNames.ts` enum
2. Initialize sensor in `entityManager.ts` `initialize()` function
3. Add device class to `deviceClass.ts` if needed
4. Add unit to `sensorUnit.ts` if needed
5. Update README.md supported sensors table
6. Add tests if the sensor requires calculation

### Debugging Network Issues

- Check IoT/NoT virtual network rules - they may block local connections
- Verify firewall rules allow traffic on the configured port
- Use Home Assistant logs to see MQTT messages
- Check weather station app (awnet) configuration

### Testing with Real Data

Use the `/data` endpoint with URL-encoded query parameters. Examples in `DEVELOPMENT.md` include:

- Basic weather data
- Lightning detection data
- AQIN air quality data
- Indoor CO2 data

### Force Home Assistant to Check for Add-on Updates

1. Go to Settings > Add-ons > Add-on Store
2. Select `...` in top right
3. Select "Check for Updates"

## Known Issues and Quirks

1. **ESLint Configuration Missing**: The project references `.eslintrc.json` which doesn't exist. This may need to be created or the project may need migration to ESLint 9 flat config.

2. **Alpine Linux Version**: Docker image uses Alpine 3.12 specifically due to Raspberry Pi compatibility issues (see issue #64).

3. **Node Deprecation Warnings**: The project uses `--experimental-loader` for ts-node which shows warnings but works correctly.

4. **Network Configuration**: IoT/NoT virtual networks and router firewalls may require configuration for local weather station connections.

5. **Weather Station App**: iOS awnet app is recommended; Android app may have compatibility issues.

## Dependencies to Be Aware Of

- **async-mqtt**: Promise-based MQTT client wrapper
- **express**: Web server for receiving weather station data
- **zod**: Schema validation for environment variables
- **winston**: Structured logging
- **moment**: Date/time manipulation
- **chalk**: Terminal color output

## Code Style

- **Indentation**: 2 spaces
- **Line Length**: 120 characters (Prettier)
- **Trailing Commas**: All (Prettier)
- **Quotes**: Prefer double quotes
- **File Headers**: Include copyright notice (see `COPYRIGHT_TEMPLATE`)
- **Imports**: ES modules (`.js` extensions required in imports)

## Testing Approach

- Tests focus on calculated sensor logic (dewpoint, feels like, etc.)
- Tests use Mocha with `describe`/`it` style
- Test environment isolated using `test/test.env`
- Mock data simulates weather station payloads

## Useful Commands Reference

```bash
# Development
npm install                    # Install dependencies
npm run build                  # Compile TypeScript
npm test                       # Run tests
npm run lint                   # Lint code and markdown
npm run format                 # Format code with Prettier
npm start                      # Run compiled application

# Docker
npm run build:docker           # Build Docker image
docker-compose up              # Start with docker-compose

# Debugging
# Use F5 in VS Code or point station to localhost:PORT
# http://localhost:PORT/discover  - Trigger auto-discovery
# http://localhost:PORT/data?...  - Send test data

# Version Management
npm version [major|minor|patch]  # Bump version
```

## External Resources

- GitHub Repository: <https://github.com/neilenns/ambientweather2mqtt>
- Home Assistant Integration: Auto-discovery via MQTT
- Ambient Weather API: Weather station sends local HTTP requests
- awnet App: iOS/Android app for configuring weather station

## Important Files for AI Agents

- **src/env.ts**: Environment variable schema and validation
- **src/entityManager.ts**: Core entity management and sensor initialization
- **src/main.ts**: Application entry point and initialization sequence
- **src/calculations.ts**: Calculated sensor algorithms
- **package.json**: All available npm scripts and dependencies
- **DEVELOPMENT.md**: Human developer documentation
- **README.md**: User-facing documentation
- **.gitignore**: Build artifacts and files to ignore

## Git Workflow

- Main branch: `main`
- Build artifacts in `dist/` are gitignored
- Environment files are gitignored (except samples)
- Docker images built automatically on release via GitHub Actions

---

**Last Updated**: 2024 (Generated for AI agent assistance)
