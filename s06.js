let http = require('http');
let server = http.createServer(requsetHandler);
server.listen(8037);



function requsetHandler(request, response) {
    console.log('request recieved:', request);
    response.writeHead(200, { 'Content-type': 'Text/plain' });
    response.write('salam 1' + request.url);
    response.end();
}