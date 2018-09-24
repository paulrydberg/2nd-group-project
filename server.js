// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.

//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
const _ = require("lodash");
const readJSON = require("./readJSON.js");
const util = require('util')
const moment = require('moment');
const holidays = require('@date/holidays-us');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
//app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
const postController = require("./controllers/post-controller.js");
const expenseController = require("./controllers/expense-controller.js");
const viewController = require("./controllers/view-controller.js");

app.use(postController);
app.use(expenseController);
app.use(viewController);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

function objLog(Obj) {
  console.log(util.inspect(Obj, { showHidden: false, depth: null }));
};


var result;

result = readJSON.lookup_user_bills();

//objLog(result);

var monthly_income = result.monthly_income_pre_tex;
var savings = result.savings;
var addIncome = result.additional_income;
var currency = result.currency;
var billsObj = result.bills;

function amount(x) {
  temp = billsObj[x].amount;
  return temp;
}

function dueDate(x) {
  temp = billsObj[x].date;
  return temp;
}

var bills = Object.keys(billsObj).map(function (key) {
  return billsObj[key];
});

billsArray = () => {
  var tempObj = {};

  for (var i = 0; i < bills.length; i++) {
    tempObj[i] = amount(i);
  }

  tempArray = Object.keys(tempObj).map(function (key) {
    return tempObj[key];
  });

  return tempArray;
}

var billsArray = billsArray();
var billSum = _.sum(billsArray);


console.log(billsObj);

DueDate = () => {
  var tempObj = {};

  for (var i = 0; i < bills.length; i++) {
    tempObj[i] = dueDate(i);
  }

  tempArray = Object.keys(tempObj).map(function (key) {
    return tempObj[key];
  });

  return tempArray;
}

var dueArray = DueDate();
//console.log('dueArray: ' + dueArray);


var nowUnix = moment().valueOf();
var momentTime = moment(nowUnix).format();

var year = parseInt(momentTime[0] + momentTime[1] + momentTime[2] + momentTime[3]);
var month = parseInt(momentTime[5] + momentTime[6]);
var day = parseInt(momentTime[8] + momentTime[9]);

var untilEnd = moment().endOf('month').fromNow();
var daysLeft = parseInt(untilEnd[3] + untilEnd[6]);
var totalDays = daysLeft + day;

var billDate;

var dayOfWeek = moment().day(daysLeft + 1).format('dddd');

function accountForMonthsDays() {
  tempObj = {};
  for (var i = 0; i < dueArray.length; i++) {
    if (totalDays < dueArray[i]) {
      tempObj[i] = totalDays;
    } else {
      tempObj[i] = dueArray[i];
    }
  }
  tempArray = Object.keys(tempObj).map(function (key) {
    return tempObj[key];
  });
  return tempArray;
}

var adjustedDayOfMonthDatesObj = accountForMonthsDays();

if (dayOfWeek == 'Sunday') {
  billDate = totalDays - 2;
} else if (dayOfWeek == 'Saturday') {
  billDate = totalDays - 1;
}

function accountForWeekend() {
  tempObj = {};
  for (var i = 0; i < adjustedDayOfMonthDatesObj.length; i++) {
    if (adjustedDayOfMonthDatesObj[i] > billDate) {
      tempObj[i] = billDate;
    } else {
      tempObj[i] = adjustedDayOfMonthDatesObj[i];
    }
  }
  var tempArray = Object.keys(tempObj).map(function (key) {
    return tempObj[key];
  });
  return tempArray;
}

var pre_holiday_due_dates = accountForWeekend();

//
//

let rawHolidayObj = {
  New_Years_Day: holidays.newYearsDay(year),
  Valentines_Day: holidays.valentinesDay(year),
  Martin_Luther_King_Day: holidays.martinLutherKingDay(year),
  Presidents_Day: holidays.presidentsDay(year),
  Easter: holidays.easter(year),
  Mothers_Day: holidays.mothersDay(year),
  Memorial_Day: holidays.memorialDay(year),
  Fathers_Day: holidays.fathersDay(year),
  Independence_Day: holidays.independenceDay(year),
  Labor_Day: holidays.laborDay(year),
  Columbus_Day: holidays.columbusDay(year),
  Halloween: holidays.halloween(year),
  Veterans_Day: holidays.veteransDay(year),
  Thanksgiving: holidays.thanksgiving(year),
  Christmas_Day: holidays.christmas(year),
};

function holidayList(data) {
  keys = Object.keys(data);
  return keys;
}

var holiday_name_Array = holidayList(rawHolidayObj);

var holiday_dates_Array = Object.keys(rawHolidayObj).map(function (key) {
  return rawHolidayObj[key];
});

var x = 11;
var realHolDate = moment(holiday_dates_Array[x]).format('L');

var hol_Month = parseInt(realHolDate[0] + realHolDate[1]);
var hol_Date = parseInt(realHolDate[3] + realHolDate[4]);
var hol_Year = parseInt(realHolDate[6] + realHolDate[7] + realHolDate[8] + realHolDate[9]);

function withHolidaysAcounted() {
  tempObj = {};
  for (var i = 0; i < holiday_dates_Array.length; i++) {
    if (tempObj[i] > billDate) {
      tempObj[i] = billDate;
    } else {
      tempObj[i] = adjustedDayOfMonthDatesObj[i];
    }
  }
  var tempArray = Object.keys(tempObj).map(function (key) {
    return tempObj[key];
  });
  return tempArray;
}


console.log(`
================================
Monthly Income: $${monthly_income}
Savings: $${savings}
Additional Income: $${addIncome}
Currency: ${currency}

Moment Output(String) - Until Month Over: ${untilEnd}
My Output As Number - Days Left In Month: ${daysLeft}

    --CURRENT DATE--
      Year: ${year}
      Month: ${month}
      Day: ${day}

Total Days In This Month: ${totalDays}

Bill Amounts: ${billsArray}
Respective Due Dates: ${pre_holiday_due_dates}
Bills Sum: $${billSum}

Number of Bills: ${bills.length}
================================
`);

