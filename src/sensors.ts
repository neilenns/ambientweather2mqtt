/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as log from "./log";
import { Sensor } from "./sensor";

let sensors: Sensor[];

export function initialize(): void {
  sensors = new Array<Sensor>();

  sensors.push(new Sensor());

  log.info("Sensors", "Sensors initialized");
}
