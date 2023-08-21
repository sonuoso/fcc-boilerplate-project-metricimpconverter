const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("#isAbove,#equal,#isAtLeast,#throws", function () {
    assert.isAbove(convertHandler.getNum("2kg"), 0);
    assert.isAbove(convertHandler.getNum("1.5lbs"), 0);
    assert.isAbove(convertHandler.getNum("1/2kg"), 0);
    assert.isAbove(convertHandler.getNum("1.2/2kg"), 0);
    assert.throws(() => convertHandler.getNum(3 / 2 / 3));
    assert.equal(convertHandler.getUnit("2kg"), "kg");
    assert.throws(() => convertHandler.getUnit("2kgg"));
    assert.equal(convertHandler.getReturnUnit("1lbs"), "kg");
    assert.equal(convertHandler.spellOutUnit("1kg"), "kilograms");
    assert.isAtLeast(convertHandler.convert(1, "gal"), 3.78541);
    assert.isAtLeast(convertHandler.convert(1, "L"), 1 / 3.78541);
    assert.isAtLeast(convertHandler.convert(1, "mi"), 1.60934);
    assert.isAtLeast(convertHandler.convert(1, "km"), 1 / 1.60934);
    assert.isAtLeast(convertHandler.convert(1, "lbs"), 0.453592);
    assert.isAtLeast(convertHandler.convert(1, "kg"), 1 / 0.453592);
  });
});
