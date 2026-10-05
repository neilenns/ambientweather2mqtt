import { expect } from "chai";
import type express from "express";
import { after, before, describe, it } from "mocha";
import { processWeatherData } from "../src/controllers/weatherDataController.js";
import * as entityManager from "../src/entityManager.js";
import EntityNames from "../src/entityNames.js";

describe("Lightning time", () => {
  const originalTz = process.env.TZ;

  // The bug only reproduces when the local timezone isn't UTC.
  before(() => {
    process.env.TZ = "America/Los_Angeles";
    entityManager.initialize();
  });

  after(() => {
    process.env.TZ = originalTz;
  });

  it("should publish lightning_time epoch seconds as the same instant regardless of local timezone", async function () {
    const epochSeconds = 1791201660;

    // Guard against the test silently passing because TZ didn't take effect.
    expect(new Date(epochSeconds * 1000).getTimezoneOffset()).to.not.equal(0);

    const req = { query: { lightning_time: String(epochSeconds) } } as unknown as express.Request;
    const res = { status: () => ({ send: () => undefined }) } as unknown as express.Response;

    await processWeatherData(req, res);

    const value = entityManager.entities.get(EntityNames.LIGHTNINGTIME)?.value;
    expect(value).to.equal(new Date(epochSeconds * 1000).toISOString());
    expect(value).to.equal("2026-10-05T12:01:00.000Z");
  });
});
