const http = require('http');
const url = 'http://nodeprogram.com';
http.get(url, (response) => {
    let rawData = '';
    response.on('data', (chunk) => {
        rawData += chunk;
    });
    response.on('end', () => {
        console.log(rawData);
    });
    response.on('error', (error)=> {
        console.error('Other error:', error);
    });
}).on('error', (error) => {
    console.error(`Got error: ${error.message}`);
});