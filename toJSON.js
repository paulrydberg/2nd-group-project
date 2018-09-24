'use strict';

const fs = require('fs');

let userData = {
    name: 'Guy',
    age: 24,
    gender: 'Male',
    zip: 'English',
    monthly_income_pre_tex: 2500,
    savings: 3000,
    additional_income: 200,
    currency: 'USD',
    bills: {
        0: {
            name: 'Comcast Internet',
            category: 'Internet',
            description: 'optional',
            date: '5',
            amount: 124.90,
            signup_date: {
                day: '?',
                month: '7',
                year: '2017',
            },
            contract_length: {
                months: 6,
                years: 1
            },
            remind_custom: false,
            custom_date: 'N/a'
        },
        1: {
            name: 'Comed',
            category: 'Electricity',
            description: 'optional',
            date: '31',
            amount: 100.00,
            signup_date: {
                day: '?',
                month: '7',
                year: '2016',
            },
            contract_length: {
                months: 6,
                years: 1
            },
            remind_custom: true,
            custom_date: 'Moment timestamp'
        }
    }
};

let data = JSON.stringify(userData);
fs.writeFileSync('user_bills.json', data);
