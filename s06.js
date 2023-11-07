let http = require('http');
let server = http.createServer(requsetHandler);
server.listen(8037);



let obj = {
    d:function(response){
        response.writeHead(200, { 'Content-type': 'Text/plain' });
    response.write('danial');
        console.log('danial test')
    },
    s:function(response){
        response.writeHead(200, { 'Content-type': 'Text/plain' });
    response.write('sajad');
        console.log('sajad test')
    },
    "favicon.ico":function(response){
        response.writeHead(200, { 'Content-type': 'Text/plain' });
    response.write('favicon');
        console.log('favicon')
    }
    
}



function requsetHandler(request, response) {
  

    let first = request.url.split('/')[1];
    console.log(first);
    obj [first](response);

    
    response.end();
}


