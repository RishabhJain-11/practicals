const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;

    if (req.url === '/') {
        fs.readFile('login.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else if (req.url === '/register') {
        fs.readFile('registration.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end("Page not found")
    }
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})