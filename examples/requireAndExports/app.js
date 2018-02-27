const sum = require('./utility.js');
require('./account-service.js');

let checkingAccountBalance = 200;
let savingsAccountBalance = 1000;
let retirementAccountBalance = 20000;

retirementAccountBalance = 40000;

let totalBalance=sum([checkingAccountBalance, savingsAccountBalance, retirementAccountBalance] );
console.log(totalBalance);