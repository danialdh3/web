 
let http = require('http');
let fs = require('fs');
var jwt = require('jsonwebtoken');
let insertToFileModule = require('./insertToFile');
let port = 8037;
let server = http.createServer(requestHandler);
server.listen(port);
console.log("Server is running on port:" + port)

let headers = {
    text: { 'Content-Type': 'Text/Plain' },
    html: { 'Content-Type': 'Text/Html' },
    jpg: { 'Content-Type': 'image/jpeg' }
};

let types = {
    text: 'Text/Plain',
    html: 'Text/Html',
    jpg: 'image/jpeg'
}

function write(response, badaneh, type){
    response.writeHead(200, headers[type]);
    response.write(badaneh);
    response.end();
}

function write(response, badaneh, type, cookie){
    if(cookie){
        response.writeHead(200, {
            "Set-Cookie": cookie,
            "Content-Type": types[type]
        });
        response.write(badaneh);
        response.end();
    }
    else{
        response.writeHead(200, headers[type]);
        response.write(badaneh);
        response.end();
    }   
}

function funcx(request, response, data) {
    let axios = require("axios");

    axios.post('http://127.0.0.1:8038/y', data)
      .then(function (response2) {
        console.log("SUCCESS status:", response2.status);
        console.log("SUCCESS headers:", response2.headers);
        console.log("SUCCESS data:", response2.data);

        write(response, response2.data, 'text')
    })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
}

function funcy(request, response) {
    console.log('this is y');
    write(response, 'salam yyyyy', 'text', 'cookiexzaaa')
    // response.writeHead(200, headers.text);
    // response.write('salam yyyyy');
    // response.end();
}

function page1controllerA(request, response) {
    console.log('this is page1controllerA');
    write(response, 'Salam <b>Be Shoma!</b>', 'text')
    // response.writeHead(200, headers.text);
    // response.write('Salam <b>Be Shoma!</b>');
    // response.end();
}

function page1controllerB(request, response) {
    console.log('this is page1controllerB');
    write(response, 'Salam <b>Be Shoma!</b>', 'html')
    // response.writeHead(200, headers.html);
    // response.write('Salam <b>Be Shoma!</b>');
    // response.end();
}

function page1controllerC(request, response) {
    console.log('this is page1controllerC');
    let page1 = `<html>
    <head>
        <style>
            div{
                width: 200px;
                height: 100px;
                background-color: lightgreen;
                padding: 30px;
            }
        </style>
        <div>
            Page 1 inside js<br>
            Salam <b>Be Shoma!</b>
        </div>
    </head>
    </html>`;

    write(response, page1, 'html')
    // response.writeHead(200, headers.html);
    // response.write(page1);
    // response.end();
}

function page2controllerA(request, response) {
    console.log('page2controllerA 1')
    fs.readFile('./page2.html', 'utf8', function (error, data) {
        console.log('page2controllerA 2');
    })
    console.log('page2controllerA 3')
}

function page2controllerB(request, response) {
    console.log('page2controllerB 1')
    fs.readFile('./page2.html', 'utf8', function (error, data) {
        console.log('page2controllerB 2');
        console.log('page2controllerB 2 error', error);
        console.log('page2controllerB 2 data', data);
    })
    console.log('page2controllerB 3')
}

function page2controllerC(request, response) {
    console.log('page2controllerC 1')
    fs.readFile('./page2.html', function (error, data) {
        console.log('page2controllerC 2');
        write(response, data, 'html');
        // response.writeHead(200, headers.html);
        // response.write(data);
        // response.end();
    })
    console.log('page2controllerC 3')
}

function page2controllerD(request, response) {
    console.log('page2controllerD 1')
    fs.readFile('./page2.html', function (error, data) {
        console.log('page2controllerD 2');
        if(error){
            write(response, 'FILE NOT FOUND.', 'text')
            // response.writeHead(200, headers.text);
            // response.write('FILE NOT FOUND.');
            // response.end();
        }
        else{
            write(response, data, 'html');
            // response.writeHead(200, headers.html);
            // response.write(data);
            // response.end();
        }
    }) 
    console.log('page2controllerD 3')
}

function fileControllerA(request, response) {
    console.log('fileController 1')
    let fileName = request.url.split('/')[2];

    fs.readFile(fileName, function (error, data) {
        console.log('fileController 2');
        if(error){
            write(response, 'FILE NOT FOUND.', 'text');
        }
        else{
            write(response, data, 'html'); 
        }
    })
    console.log('fileController 3')
}

function fileControllerB(request, response) {
    console.log('fileController 1')
    let fileName = request.url.split('/')[2];
    let extention = fileName.split('.')[1];

    fs.readFile(fileName, function (error, data) {
        console.log('fileController 2');
        if(error){
            write(response, 'FILE NOT FOUND.', 'text');
        }
        else{
            write(response, data, extention); 
        }
    })
    console.log('fileController 3')
}

function insertToFileA(request, response, data){
    console.log("inside insertToFile", data);
    data = JSON.stringify(data);
    console.log("sss", data)
    fs.appendFile('message.txt', data, function(error) {
        if(error){
            write(response, 'FS ERROR.', 'text');
        }
        else{
            write(response, "Data Saved.", 'text'); 
        }
    }); 
}

function insertToFileB(request, response, data){
    console.log("inside insertToFile", data);
    data = JSON.stringify(data);
    console.log("sss", data)
    fs.appendFile('message.txt', data, function(error) {
        if(error){
            write(response, 'FS ERROR.', 'text');
        }
        else{
            fs.readFile('message.txt', function (error, fileData) {
                if(error){
                    write(response, 'FILE NOT FOUND.', 'text');
                }
                else{
                    write(response, fileData, 'text'); 
                }
            })
        }
    }); 
}


function insertToFileC(request, response, data){
    console.log("inside insertToFile", data);

    fs.readFile('message.txt', function (error, fileData) {
        if(error){
            write(response, 'FILE NOT FOUND.', 'text');
        }
        else{

            fileData = JSON.parse(fileData);
            fileData.data.push(JSON.parse(data));
            fileData = JSON.stringify(fileData);

            fs.writeFile('message.txt', fileData, 'utf8', function(error) {
                if(error){
                    write(response, 'FS ERROR.', 'text');
                }
                else{
                    write(response, "Data Saved.", 'text'); 
                }
            }); 
        }
    });
}

function signupController(request, response, data){
    console.log("inside insertToFile", data);
    data = JSON.parse(data);

    if(data.user === undefined 
        || data.pass === undefined
        || data.email === undefined){
            write(response, 'BAD DATA.', 'text');
    }
    else{
        fs.readFile('database.txt', function (error, fileData) {
            if(error){
                write(response, 'FILE NOT FOUND.', 'text');
            }
            else{
    
                fileData = JSON.parse(fileData);
                fileData.data.push(data);
                fileData = JSON.stringify(fileData);
    
                fs.writeFile('database.txt', fileData, 'utf8', function(error) {
                    if(error){
                        write(response, 'FS ERROR.', 'text');
                    }
                    else{
                        write(response, "Data Saved.", 'text'); 
                    }
                }); 
            }
        });
    } 
}

function loginControllerA(request, response, data){
    data = JSON.parse(data);

    if(data.user === undefined 
        || data.pass === undefined){
            write(response, 'BAD DATA.', 'text');
    }
    else{
        fs.readFile('database.txt', function (error, fileData) {
            if(error){
                write(response, 'FILE NOT FOUND.', 'text');
            }
            else{
                fileData = JSON.parse(fileData);
                let found = false;
                for(i=0; i<fileData.data.length; i++){
                    if(fileData.data[i].user === data.user 
                        && fileData.data[i].pass === data.pass){
                        found = true;
                        write(response, "user found!!!", 'text');
                    }
                }    
                if(found === false){
                    write(response, "user NOT found", 'text');
                }            
            }
        });
    } 
}

function loginControllerB(request, response, data){
    let secret = "mysecretcode";
    data = JSON.parse(data);

    if(data.user === undefined || data.pass === undefined){
            write(response, 'BAD DATA.', 'text');
    }
    else{
        fs.readFile('database.txt', function (error, fileData) {
            if(error){
                write(response, 'FILE NOT FOUND.', 'text');
            }
            else{
                fileData = JSON.parse(fileData);
                let found = false;
                for(i=0; i<fileData.data.length; i++){
                    if(fileData.data[i].user === data.user 
                        && fileData.data[i].pass === data.pass){

                        found = true;
                        let token = jwt.sign({ user: fileData.data[i].user}, secret);
                        write(response, 'Login Done.', 'text', token);
                    }
                }
                if(found === false){
                    write(response, "user not found", 'text');
                }
            }
        });
    }
}

function verifyCookie(request, response) {
    let secret = "mysecretcode";
    let decodedCookie = jwt.verify(request.headers.cookie, secret);
    
    fs.readFile('database.txt', function (error, fileData) {
        if(error){
            write(response, 'FILE NOT FOUND.', 'text');
        }
        else{
            fileData = JSON.parse(fileData);
            let found = false;
            for(i=0; i<fileData.data.length; i++){
                if(fileData.data[i].user === decodedCookie.user){
                    found = true;
                    write(response, "Cookie is valid", 'text');
                }
            }
            if(found === false){
                write(response, "Cookie is not valid", 'text');
            }
        }
    });
}

let routes = {
    x: funcx,
    y: funcy,
    page1a: page1controllerA,
    page1b: page1controllerB,
    page1c: page1controllerC,
    page2a: page2controllerA,
    page2b: page2controllerB,
    page2c: page2controllerC,
    page2d: page2controllerD,
    fileA: fileControllerA,
    fileB: fileControllerB,
    insertToFileA: insertToFileA,
    insertToFileB: insertToFileB,
    insertToFileC: insertToFileC,
    insertToFileD: insertToFileModule.insertToFile,
    signup: signupController,
    loginA: loginControllerA,
    loginB: loginControllerB,
    verify: verifyCookie,
    pagesingup2 : pagesingup2
}

function requestHandler(request, response) {
    let firstPart = request.url.split('/')[1];

    if (firstPart !== 'favicon.ico') {

        console.log('______________________________________________________')
        console.log('method:url', request.method + ':' + request.url);
        console.log('splitted  ', request.url.split('/'));
        console.log('firstPart ', firstPart);
        console.log('headers   ', request.headers)
        
        let data = "";
        request.on('data', function(chunk){  
            data += chunk;
        });
        request.on('end', function(){
            console.log("Data:     ", data);
            try{
                routes[firstPart](request, response, data);
            }
            catch(error){
                console.log('CATCHED ERROR', error, firstPart, routes[firstPart]);
                write(response, 'ERROR... ROUTE NOT FOUND.', 'text');
            }
        });               
    }
}




