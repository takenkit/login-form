'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const form = fs.readFileSync('form.html');
const home = fs.readFileSync('home.html');
const qs = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(form);
    } else if (req.method === 'POST' && req.url.indexOf('/login') == 0) {
        var data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            var json = JSON.parse(data);
            var username = json['username'];
            var password = json['password'];
            if (username == 'takenkit') {
                console.log('username OK');
                if (password== 'xxxx') {
                    console.log('password OK');
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(home);
                } else {
                    console.log('password NG');
                    // ユーザ名またはパスワードが間違っています
                    res.statusCode = 401;
                    res.end();
                }
            } else {
                console.log('username NG');
                // ユーザ名またはパスワードが間違っています
                res.statusCode = 401;
                res.end();
            }
        });
    }
});


// HTTPサーバ起動
server.listen(port, hostname, () => {
    console.log(`Server runnning at http://${hostname}:${port}/`);
});