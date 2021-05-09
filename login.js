'use strict';
const http = require('http');
const fs = require('fs');
const login = fs.readFileSync('login.html');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(login);
    } else if (req.method === 'POST') {
        var data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {    
            var json = JSON.parse(data);
            if (json['username'] == 'takenkit') {
                console.log('username OK');
                if (json['password'] == 'xxxx') {
                    console.log('password OK');

                    json['username'] = 'Hello, ' + json['username'] + '!!';
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(json));
                } else {
                    console.log('password NG');
                }
            } else {
                console.log('username NG');
            }
        });
    }
});

// HTTPサーバ起動
server.listen(port, hostname, () => {
    console.log(`Server runnning at http://${hostname}:${port}/`);
});