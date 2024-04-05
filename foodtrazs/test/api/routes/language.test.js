import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import LanguageService from "../../../src/services/language.js";

jest.mock("../../../src/services/language.js");

describe("/api/v1/language/", () => {
  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    LanguageService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/language")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(LanguageService.list).toHaveBeenCalled();
  });

  test("POST creates a new Language", async () => {
    const data = {
      languageId: 42,
      languageName: "test",
      createdBy: "test",
      updatedBy: "test",
      updatedDate: "2001-01-01T00:00:00Z",
      createdDate: "2001-01-01T00:00:00Z",
    };

    LanguageService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/language")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(LanguageService.create).toHaveBeenCalledWith(data);
  });
});

describe("/api/v1/language/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    LanguageService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/language/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(LanguageService.get).toHaveBeenCalledWith(1);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    LanguageService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/language/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(LanguageService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    LanguageService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/language/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(LanguageService.get).not.toHaveBeenCalled();
  });

  test("Language update", async () => {
    const data = {};
    LanguageService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/language/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(LanguageService.update).toHaveBeenCalledWith(1, data);
  });

  test("Language deletion", async () => {
    LanguageService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/language/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(LanguageService.delete).toHaveBeenCalledWith(1);
  });
});
