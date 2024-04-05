import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import ProductService from "../../../src/services/product.js";

jest.mock("../../../src/services/product.js");

describe("/api/v1/product/", () => {
  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    ProductService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/product")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(ProductService.list).toHaveBeenCalled();
  });

  test("POST creates a new Product", async () => {
    const data = {
      productId: "test",
      tenantId: "test",
      organisationId: "test",
      name: "test",
      branchId: "test",
      createdBy: "test",
      updatedBy: "test",
      createdDate: "2001-01-01T00:00:00Z",
      updatedDate: "2001-01-01T00:00:00Z",
    };

    ProductService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/product")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(ProductService.create).toHaveBeenCalledWith(data);
  });
});

describe("/api/v1/product/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    ProductService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/product/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(ProductService.get).toHaveBeenCalledWith(1);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    ProductService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/product/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(ProductService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    ProductService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/product/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(ProductService.get).not.toHaveBeenCalled();
  });

  test("Product update", async () => {
    const data = {};
    ProductService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/product/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(ProductService.update).toHaveBeenCalledWith(1, data);
  });

  test("Product deletion", async () => {
    ProductService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/product/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(ProductService.delete).toHaveBeenCalledWith(1);
  });
});
