const fs = require('fs');
const path = require('path');

let fileName = 'customer-data.csv';

let data;

// read file synchronously and catch errors
try {
    data = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
} catch (err) {
    console.log('Encountered error: ', err.message);
    process.exit(1);
}

console.log('Conversion started. Processing:', fileName);

// split file on newline
let dataArray = data.split(/\r?\n/);

// split first line to get JSON names
let jsonNames = dataArray[0].split(',');

let jsonData = [];

// loop through lines after header to create object
for (let i = 1; i < dataArray.length; i++) {
    // skip any blank lines like the last line
    if (dataArray[i] === '') continue;
    // initialize each element to empty object
    let jsonElement = {};
    // split each line into an array of values
    let jsonElementData = dataArray[i].split(',');
    // loop through names and values to build element
    for (let j = 0; j < jsonNames.length; j++) {
        jsonElement[jsonNames[j]] = jsonElementData[j];
    }
    // push element into JSON object
    jsonData.push(jsonElement);
}

// set name of output file
let outFile = 'customer-data.json';

// stringify JSON
let jsonString = JSON.stringify(jsonData, null, 2);
// replace line endings to match solution file
jsonString = jsonString.replace(/\n/g,'\r\n');

// write file synchronously and catch errors
try { 
    fs.writeFileSync(path.join(__dirname, outFile), jsonString);
} catch (err) {
    console.log('Encountered error: ', err.message);
    process.exit(1);
}

console.log('Conversion completed. Wrote:', outFile);