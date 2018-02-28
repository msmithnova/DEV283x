// needed requires
const fs = require('fs');
const path = require('path');

// test command line options
processArgs(process.argv);

// set filename to command line option or default
let fileName = process.argv[2] || 'customer-data.csv';

// set full system path to file
let fullPath = path.join(__dirname, fileName);

let data;

try {
    // read file synchronously
    data = fs.readFileSync(fullPath, 'utf8');
} catch (err) {
    // if there is an eror display message and exit
    console.log('Encountered error: ', err.message);
    process.exit(1);
}

// display console message that conversion is in progress
console.log('Conversion started. Processing:', fileName);

// split file on newline
let dataArray = data.split(/\r?\n/);

// split first line to get JSON names
let jsonNames = dataArray[0].split(',');

// initialize empty JSON object
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

// use supplied filename or assume anything after last '.' is extension
// and replace with '.json'
let outFile = process.argv[3] || fileName.slice(0, fileName.lastIndexOf('.')) + '.json';

// stringify JSON
let jsonString = JSON.stringify(jsonData, null, 2);
// replace line endings to match solution file
jsonString = jsonString.replace(/\n/g,'\r\n');

try {
    // write file synchronously
    fs.writeFileSync(path.join(__dirname, outFile), jsonString);
} catch (err) {
    // if there is an eror display message and exit
    console.log('Encountered error: ', err.message);
    process.exit(1);
}

// display message that conversion is complete
console.log('Conversion completed. Wrote:', outFile);

function processArgs(argv) {
    // set filenme pattern for a basic check
    let fileNamePattern = new RegExp(/^[\w\s-.]+$/);
    // check for too many args, proper filenames and help option
    if (argv.length > 4) {
        console.log('Too many options.');
    } else if (argv[2] === '-h' || argv[2] === '--help') {
        console.log('Welcome to csv-to-json');
    } else if (argv.length > 2 && !fileNamePattern.test(argv[2])) {
        console.log('First option does not appear to be a valid filename.');
    } else if (argv.length > 3 && !fileNamePattern.test(argv[3])) {
        console.log(argv[3]);
        console.log('Second option does not appear to be a valid filename.');
    } else {
        // just return if all seems fine
        return;
    }
    // call usage and exit if all is not fine
    usage();
    process.exit(1);
}

function usage() {
    console.log('Usage: node csv-to-json.js <optional input file> <optional output file>');
    console.log('Input file defaults to customer-data.csv if not supplied.');
    console.log('Output file defaults to <filename>.json if not supplied.');
}