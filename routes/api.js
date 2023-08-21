"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let input = req.query.input;
    let data = {};

    //Check if getNum() and getUnit() throws errors
    if (convertHandler.getNum(input) == "invalid number") {
      if (convertHandler.getUnit(input) == "invalid unit") {
        data = "invalid number and unit";
      } else {
        data = "invalid number";
      }
    } else {
      if (convertHandler.getUnit(input) == "invalid unit") {
        data = "invalid unit";
      }
      //If no errors found assign returned values from required functions to specified variables
      else {
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let string = convertHandler.getString(
          initNum,
          initUnit,
          returnNum,
          returnUnit
        );

        //Populate data object with previously assigned variables
        data = {
          initNum: +initNum,
          initUnit: initUnit,
          returnNum: +returnNum,
          returnUnit: returnUnit,
          string: string,
        };
      }
    }

    res.send(data);
  });
};
