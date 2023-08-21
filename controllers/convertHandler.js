function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let divOp;

    if (input != null) {
      result = input.replace(/[a-zA-Z]/g, ""); //Replace all found letters in both uppercase and lowercase with a null value
      divOp = input.match(/\//g); //Assign all available '/' division operators to divOp variable
      if (result.length == 0) {
        result = 1; //If the input argument is empty, assign numerical 1
      } else {
        if (isNaN(result)) {
          if (divOp != null) {
            if (divOp.length == 1) {
              let nVal = result.split("/"); //if divOp has one '/', split result into two numerical values in nVal array
              if (nVal[0] > 0 && nVal[1] > 0) {
                result = nVal[0] / nVal[1]; //if all elements of nVal array contain a valid number, perform division operation
              } else {
                result = "invalid number";
              }
            } else {
              result = "invalid number";
            }
          }
        } else {
          //If result is numerical check if it's negative
          if (result > 0) {
            result = result;
          } else {
            result = "invalid number";
          }
        }
      }
    } else {
      result = "invalid unit";
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    if (input != null) {
      let unitArray = ["gal", "l", "km", "mi", "lbs", "kg"];
      let firstChar = input.match(/[a-zA-Z]/); //Check the first letter in input argument
      let splitValue;

      if (firstChar != null) {
        splitValue = input.slice(firstChar.index); //Slice the input argument at the index of it's first letter found
        splitValue = splitValue.toLowerCase();

        //Check if sliced splitValue string matches any unit in unitArray
        if (unitArray.includes(splitValue)) {
          if (splitValue == "l") {
            result = splitValue = "L";
          } else {
            result = splitValue;
          }
        } else {
          result = "invalid unit";
        }
      } else {
        result = "invalid unit";
      }
    } else {
      result = "invalid unit";
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();

    let unitObj = {
      gal: "L",
      l: "gal",
      km: "mi",
      mi: "km",
      lbs: "kg",
      kg: "lbs",
    };

    if (initUnit in unitObj) {
      result = unitObj[initUnit];
    }

    return result;
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

    result = unitObj[unit];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();

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

    return result.toFixed(5); //Round the returning numerical result to 5 decimal places
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    initUnit = this.spellOutUnit(initUnit);
    returnUnit = this.spellOutUnit(returnUnit);

    let strMsg =
      initNum + " " + initUnit + " converts to " + returnNum + " " + returnUnit;
    result = strMsg;

    return result;
  };
}

module.exports = ConvertHandler;
