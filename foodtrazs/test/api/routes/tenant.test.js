import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import TenantService from "../../../src/services/tenant.js";

jest.mock("../../../src/services/tenant.js");

describe("/api/v1/tenant/", () => {
  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    TenantService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/tenant")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(TenantService.list).toHaveBeenCalled();
  });

  test("POST creates a new Tenant", async () => {
    const data = {
      tenantId: "test",
      dbName: "test",
      dbUsername: "test",
      dbPassword: "test",
      createdDate: "2001-01-01T00:00:00Z",
      updatedDate: "2001-01-01T00:00:00Z",
      createdBy: "test",
      updatedBy: "test",
    };

    TenantService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/tenant")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(TenantService.create).toHaveBeenCalledWith(data);
  });
});

describe("/api/v1/tenant/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    TenantService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/tenant/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(TenantService.get).toHaveBeenCalledWith(1);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    TenantService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/tenant/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(TenantService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    TenantService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/tenant/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(TenantService.get).not.toHaveBeenCalled();
  });

  test("Tenant update", async () => {
    const data = {};
    TenantService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/tenant/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(TenantService.update).toHaveBeenCalledWith(1, data);
  });

  test("Tenant deletion", async () => {
    TenantService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/tenant/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(TenantService.delete).toHaveBeenCalledWith(1);
  });
});
