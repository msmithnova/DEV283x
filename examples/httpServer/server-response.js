const http = require('http');
const port = 3000;
const bodyP1 = 'Hello';
const bodyP2 = ' World\n';
http.createServer((request, response) => {
    response.writeHead(404, {
        'Content-Length': (bodyP1 + bodyP2).length,
        'Content-Type': 'text/plain'
    });
    response.statusCode = 200;
    response.write(bodyP1);
    response.end(bodyP2);
}).listen(port);

console.log(`Server running at http://localhost:${port}/`);