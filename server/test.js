const assert = require("assert");
const request = require("supertest");
const api = require("./server");
const app = api.app;

describe("Report System", () => {
  describe("Erroneous URL", () => {
    it("returns 404", done => {
      request(app)
        .get("/error")
        .expect(404, done);
    });
  });

  describe("GET All data", () => {
    it("returns 200 OK", done => {
      request(app)
        .get("/report/allData")
        .set("Accept", "application/json")
        .expect(200, done);
    });

    it("returns JSON", done => {
      request(app)
        .get("/report/allData")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/, done);
    });
  });
});
