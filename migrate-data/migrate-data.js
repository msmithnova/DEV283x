const customerData = require('./customer-data.json');
const customerAddressData = require('./customer-address-data.json');
const async = require('async');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let tasks = [];
const blockSize = parseInt(process.argv[2]) || 100;

// Connection URI
const url = 'mongodb://localhost:27017';
// Use connect method to connect to the Server
MongoClient.connect(url, (err, client) => {
    if (err) return process.exit(1);
    console.log('Kudos. Connected successfully to server');
    var db = client.db('migrate-data');

    for (let i = 1; i < customerData.length; i++) {
        customerData[i] = Object.assign(customerData[i], customerAddressData[i]);
    }

    for (let start = 0; start < customerData.length; start += blockSize) {
        let end = start + blockSize;
        tasks.push((cb) => {
            console.log(`Processing ${start}-${end} out of ${customerData.length}`);
            let tempArray = customerData.slice(start, end);
            db.collection('customers').insertMany(tempArray, (error, results) => {
                cb(error, results);
            });
        });
    }

    console.log(`Launching ${tasks.length} parallel task(s)`);
    const startTime = Date.now();
    async.parallel(tasks, (error, results) => {
        if (error) console.error(error);
        const endTime = Date.now();
        console.log(`Execution time: ${endTime - startTime}`);
        //console.log(results);
        client.close();
    });
});