/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Neil Enns. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import EntityDataPayload from "./entityDataPayload";

// Returns true if the value really is a number
export function isNumber(value: EntityDataPayload): boolean {
  if (value === undefined) {
    return false;
  }

  // Don't set the payload if it's not really a number
  if (typeof value === "number" && isNaN(value)) {
    return false;
  }

  return true;
}
