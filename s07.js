let ht = require("http");
let server = ht.createServer(rh);
let port = 1800;
server.listen(port);

let hedear = {
    html: { 'content-type': 'text/html' }
}

let route = {
    mor: funcmore,
}

function funcmore() {
    response.writeHead(200, hedear.html)
    response.write(`
        <html>
        <body>
        <span style = "background:red;padding:1rem" > 5 </span>
        </body>
        </html>`
    );
    response.end();
}

function rh(request, response) {
    let firstpart = request.url.split('/')[1];
    if (firstpart !== 'favicon.ico') {
        if (route[firstpart] instanceof Function) route[firstpart](response);
    }
}