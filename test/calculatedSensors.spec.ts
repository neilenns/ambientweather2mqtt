import { expect } from "chai";
import { describe, it } from "mocha";
import { calculateDewPoint, calculateFeelsLike, calculateSolarRadiationLux } from "../src/calculations";

describe("Calculated sensors", () => {
  // All dewpoint calculations are tested to one decimal place
  it("should calculate dewpoint", async function () {
    // Expected values calculated by using https://www.calculator.net/dew-point-calculator.html
    expect(calculateDewPoint(70, 65)).to.closeTo(57.7, 1);
    expect(calculateDewPoint(36, 47)).to.closeTo(17.3, 1);
    expect(calculateDewPoint(32, 38)).to.closeTo(9.2, 1);
  });

  it("should calculate feels like - windchill", async function () {
    // These should return a windchill value
    // Expected values calculated by using https://www.calculator.net/wind-chill-calculator.html
    expect(calculateFeelsLike(49, 10, 50)).to.closeTo(45, 1); // Cutoff is 50F so this should produce a windchill value
    expect(calculateFeelsLike(32, 10, 38)).to.closeTo(24, 1);
    expect(calculateFeelsLike(-6, 17, 67)).to.closeTo(-28, 1);
  });

  it("should calculate feels like - heat index", async function () {
    // These should return a heat index value
    // Expected values calculated by using https://www.calculator.net/heat-index-calculator.html
    expect(calculateFeelsLike(69, 3, 90)).to.closeTo(70, 1); // Cutoff is 68F so this should produce a heat index value
    expect(calculateFeelsLike(77, 3, 50)).to.closeTo(77, 1);
    expect(calculateFeelsLike(77, 3, 90)).to.closeTo(79, 1);
    expect(calculateFeelsLike(85, 3, 90)).to.closeTo(102, 1);
  });

  it("should calculate feels like - temperature", async function () {
    // These should return the original temperature
    expect(calculateFeelsLike(50, 3, 50)).to.closeTo(50, 1);
    expect(calculateFeelsLike(68, 3, 90)).to.closeTo(68, 1);
    expect(calculateFeelsLike(55, 3, 90)).to.closeTo(55, 1);
  });

  it("should calculate solar radiation (lux)", async function () {
    // Expected value calculated manually by applying the math from the Home Assistant source code
    expect(calculateSolarRadiationLux(93.58)).to.closeTo(11846, 1);
  });
});
