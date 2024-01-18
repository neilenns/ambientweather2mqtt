import { expect } from "chai";
import { describe, it } from "mocha";
import { calculateDewPoint } from "../src/calculations";

describe("Calculated sensors", () => {
  it("should calculate dewpoint", async function () {
    const result = calculateDewPoint(40, 20);

    expect(result).to.equal(42);
  });
});
