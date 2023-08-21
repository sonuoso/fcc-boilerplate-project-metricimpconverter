"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let input = req.body.input;
    let data = {
      initNum: convertHandler.getNum(input),
      initUnit: convertHandler.getUnit(input),
      returnNum: convertHandler.convert(initNum, initUnit),
      returnUnit: convertHandler.getReturnUnit(initUnit),
      string: convertHandler.string(initNum, initUnit, returnNum, returnUnit),
    };
    req.data = data;
    res.redirect("/");
  });
};
