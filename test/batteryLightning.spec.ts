import { expect } from "chai";
import type express from "express";
import { beforeEach, describe, it } from "mocha";
import { processWeatherData } from "../src/controllers/weatherDataController.js";
import * as entityManager from "../src/entityManager.js";
import EntityNames from "../src/entityNames.js";

// Ambient Weather's batt_lightning uses the opposite convention from the other battery fields:
// 0 = OK, 1 = Low. See https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs
describe("Lightning battery", () => {
  const res = { status: () => ({ send: () => undefined }) } as unknown as express.Response;

  async function send(query: Record<string, string>) {
    const req = { query } as unknown as express.Request;
    await processWeatherData(req, res);
  }

  beforeEach(() => {
    entityManager.initialize();
  });

  it("should report 100 when batt_lightning is 0 (OK)", async function () {
    await send({ batt_lightning: "0" });
    expect(entityManager.entities.get(EntityNames.BATTERYLIGHTNING)?.value).to.equal(100);
  });

  it("should report 0 when batt_lightning is 1 (Low)", async function () {
    await send({ batt_lightning: "1" });
    expect(entityManager.entities.get(EntityNames.BATTERYLIGHTNING)?.value).to.equal(0);
  });

  it("should not change the convention for other battery fields", async function () {
    await send({ battout: "1", batt_lightning: "0" });
    expect(entityManager.entities.get(EntityNames.BATTERYOK)?.value).to.equal(100);
    expect(entityManager.entities.get(EntityNames.BATTERYLIGHTNING)?.value).to.equal(100);
  });

  it("should not set a value when batt_lightning is absent", async function () {
    await send({ battout: "1" });
    expect(entityManager.entities.get(EntityNames.BATTERYLIGHTNING)?.value).to.be.undefined;
  });
});
