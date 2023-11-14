let ht = require("http");
let fs = require('fs');
let server = ht.createServer(rh);
let port = 1800;
server.listen(port);

let hedear = {
    html: { 'content-type': 'text/html' }
}

let route = {
    mor: funcmore,
    morFile: funcmorFile
}

function funcmorFile() {

}

function funcmore(response) {
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
        if (route[firstpart] instanceof Function) {
            route[firstpart](response);
        } else {
            exitBy404Error(response);
        }
    }
}

function exitBy404Error(response) {
    response.writeHead(200, hedear.html)
    fs.readFile('files/404.html', 'utf-8', (e, d) => {
        if (e) {
            exitByError(response);
        } else {
            response.write(d);
            response.end();
        }
    });
}

function exitByError(response) {
    fs.readFile('files/error.html', 'utf-8', (e, d) => {
        if (e) {
            console.log(e);
        } else {
            response.write(d);
            response.end();
        }
    });
}