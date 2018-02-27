const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, '/data/message.txt'), 'Hello World!', function (error) {
  if (error) return console.error(error);
  console.log('Writing is done.');
});

fs.readFile(path.join(__dirname, '/data/customers.csv'), {encoding: 'utf-8'}, function (error, data) {
  if (error) return console.error(error);
  console.log(data);
});