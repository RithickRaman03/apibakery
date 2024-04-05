import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import UnitOfMeasureService from "../../../src/services/unitofmeasure.js";

jest.mock("../../../src/services/unitofmeasure.js");

describe("/api/v1/unit-of-measure/", () => {
  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    UnitOfMeasureService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/unit-of-measure")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(UnitOfMeasureService.list).toHaveBeenCalled();
  });

  test("POST creates a new UnitOfMeasure", async () => {
    const data = {
      unitId: "test",
      weight: "test",
      volume: "test",
      createdBy: "test",
      createdDate: "2001-01-01T00:00:00Z",
      updatedBy: "test",
      updatedDate: "test",
    };

    UnitOfMeasureService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/unit-of-measure")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(UnitOfMeasureService.create).toHaveBeenCalledWith(data);
  });
});

describe("/api/v1/unit-of-measure/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    UnitOfMeasureService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/unit-of-measure/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(UnitOfMeasureService.get).toHaveBeenCalledWith(1);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    UnitOfMeasureService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/unit-of-measure/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(UnitOfMeasureService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    UnitOfMeasureService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/unit-of-measure/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(UnitOfMeasureService.get).not.toHaveBeenCalled();
  });

  test("UnitOfMeasure update", async () => {
    const data = {};
    UnitOfMeasureService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/unit-of-measure/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(UnitOfMeasureService.update).toHaveBeenCalledWith(1, data);
  });

  test("UnitOfMeasure deletion", async () => {
    UnitOfMeasureService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/unit-of-measure/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(UnitOfMeasureService.delete).toHaveBeenCalledWith(1);
  });
});
