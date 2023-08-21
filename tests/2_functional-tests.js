const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.isAtLeast(res.data.returnNum, 2.64172176858);
        assert.equal(res.data.returnUnit, "gal");
        done();
      });
  });

  test("Convert an invalid input such as 32g", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(err, "invalid unit");
        done();
      });
  });

  test("Convert an invalid number such as 3/7.2/4kg", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(err, "invalid number");
        done();
      });
  });

  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(err, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number such as kg", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.atLeast(res.data.returnNum, 1 / 0.453592);
        done();
      });
  });
});
