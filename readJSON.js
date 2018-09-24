'use strict';

const fs = require('fs');
const util = require('util')


function objLog(Obj) {
    console.log(util.inspect(Obj, { showHidden: false, depth: null }))
};


let rawdata = fs.readFileSync('user_bills');
let user_bills = JSON.parse(rawdata);
//objLog(user_bills);

function billData() {
    return user_bills;
}

module.exports.lookup_user_bills = () =>
    billData();
