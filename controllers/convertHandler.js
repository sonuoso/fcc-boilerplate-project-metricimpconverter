function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    result = input.replace(/[a-zA-Z]/g, "");

    if (result == null || result.length == 0) {
      result = 1;
    }

    if (result < 0) {
      throw new Error("invalid number");
    }

    let d;
    for (let i = 0; input.length > 0; i++) {
      if (input[i] == "/") {
        d++;
      }
    }

    if (d > 1) {
      throw new Error("invalid number");
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    let unitArray = ["gal", "l", "km", "mi", "lbs", "kg"];
    let splitArray = input.split(/[a-zA-Z]/g);
    if (splitArray.length == 2) {
      for (let i = 0; i < unitArray.length; i++) {
        splitArray[1] = splitArray[1].toLowerCase();
        if (splitArray[1] == unitArray[i]) {
          if (splitArray[0] == null || splitArray[0].length == 0) {
            splitArray[0] = 1;
          } else {
            if (splitArray[0] > 0) {
              if (splitArray[1] == "l") {
                result = splitArray["L"];
              } else {
                result = splitArray[1];
              }
            } else {
              throw new Error("invalid number");
            }
          }
        } else {
          if (splitArray[0] > 0) {
            throw new Error("invalid unit");
          } else {
            throw new Error("invalid number and unit");
          }
        }
      }
    } else {
      throw new Error("invalid number and unit");
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();
    let inArray = ["gal", "l", "km", "mi", "lbs", "kg"];
    let outArray = ["L", "gal", "mi", "km", "kg", "lbs"];
    for (let i = 0; i < inArray.length; i++) {
      if (initUnit == inArray[i]) {
        result = outArray[i];
      }

      return result;
    }
  };

  this.spellOutUnit = function (unit) {
    let result;
    unit = unit.toLowerCase();
    let unitObj = {
      gal: "gallons",
      l: "liters",
      km: "kilometers",
      mi: "miles",
      lbs: "pounds",
      kg: "kilograms",
    };

    if (unit in unitObj) {
      result = unitObj[unit];
    } else {
      throw new Error("invalid unit");
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    let result;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    initNum = this.getNum(initNum);
    initUnit = this.spellOutUnit(initUnit);
    returnNum = this.convert(initNum, initUnit);
    returnUnit = this.spellOutUnit(returnUnit);
    let strMsg =
      initNum + " " + initUnit + " converts to " + returnNum + " " + returnUnit;
    result = strMsg;
    return result;
  };
}

module.exports = ConvertHandler;
