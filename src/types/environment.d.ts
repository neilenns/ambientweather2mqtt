/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MQTT_SERVER?: string;
      MQTT_USERNAME?: string;
      MQTT_PASSWORD?: string;
      MQTT_REJECT_UNAUTHORIZED?: "true" | "false";
      STATION_MAC_ADDRESS?: string;
      PORT?: string;
      VERBOSE?: "true" | "false";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
