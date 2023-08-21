const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  //#1
  test("convertHandler should correctly read a whole number input.", function () {
    assert.equal(convertHandler.getNum("10kg"), 10);
  });

  //#2
  test("convertHandler should correctly read a decimal number input.", function () {
    assert.equal(convertHandler.getNum("1.5kg"), 1.5);
  });

  //#3
  test("convertHandler should correctly read a fractional input.", function () {
    assert.equal(convertHandler.getNum("1/2kg"), 0.5);
  });

  //#4
  test("convertHandler should correctly read a fractional input with a decimal.", function () {
    assert.equal(convertHandler.getNum("1.2/2kg"), 0.6);
  });

  //#5
  test("convertHandler should correctly return an error on a double-fraction.", function () {
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
  });

  //#6
  test("convertHandler should correctly read each valid input unit.", function () {
    assert.equal(convertHandler.getUnit("kg"), "kg");
  });

  //#7
  test("convertHandler should correctly return an error for an invalid input unit.", function () {
    assert.equal(convertHandler.getUnit("kgg"), "invalid unit");
  });

  //#8
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    assert.equal(convertHandler.getNum("kg"), 1);
  });

  //#9
  test("convertHandler should return the correct return unit for each valid input unit.", function () {
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
  });

  //#10
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  //#11
  test("convertHandler should correctly convert gal to L.", function () {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
  });

  //#12
  test("convertHandler should correctly convert L to gal.", function () {
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
  });

  //#13
  test("convertHandler should correctly convert mi to km.", function () {
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
  });

  //#14
  test("convertHandler should correctly convert km to mi.", function () {
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
  });

  //#15
  test("convertHandler should correctly convert lbs to kg.", function () {
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
  });

  //#16
  test("convertHandler should correctly convert kg to lbs.", function () {
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
  });
});
