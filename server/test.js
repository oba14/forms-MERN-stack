const assert = require("assert");
const request = require("supertest");
const api = require("./server");
const app = api.app;

describe("Forms-MERN-stack", () => {
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

  describe("Find one form in the database", () => {
    it("returns 200", done => {
      request(app)
        .get("/report/findone/5e1a4a46a2965e47bbb14d88")
        .set("Accept", "application/json")
        .expect(200, done);
    });

    it("returns json", done => {
      request(app)
        .get("/report/findone/5e1a4a46a2965e47bbb14d88")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/, done);
    });

    it("returns form data", done => {
      request(app)
        .get("/report/findone/5e1a4a46a2965e47bbb14d88")
        .set("Accept", "application/json")
        .expect(res => {
          assert.equal(res.body.username, "luci");
        })
        .end(done);
    });
  });

  describe("GET one failures", () => {
    it("returns 404 for a FORM that doesnt exist", done => {
      request(app)
        .get("/report/findone/UUUUUUUUUU")
        .set("Accept", "application/json")
        .expect(res => {
          // console.log('notf founf', res.body);
          assert.equal(res.body.message, "form not found");
        })
        .end(done);
    });
  });
});

describe("EDIT FORM BY GIVEN ID", () => {
  it("returns JSON", done => {
    request(app)
      .put("/report/edit/5e1a4754a2965e47bbb14d85")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/, done);
  });

  it("returns 200 OK", done => {
    request(app)
      .put("/report/edit/5e1a4754a2965e47bbb14d85")
      .set("Accept", "application/json")
      .expect(200, done);
  });

  it("returns Form data", done => {
    request(app)
      .put("/report/edit/5e1a4754a2965e47bbb14d85")
      .send({ username: "James Bond" })
      .set("Accept", "application/json")
      .expect(res => {
        assert.equal(res.body.reqq.username, "James Bond");
      })
      .end(done);
  });
});
