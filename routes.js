const fs = require('fs');

const requestHandler = (req, res) => {
    //console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>This is my NodeJS Server</title>
        </head>
        <body>
            <h1 style="text-align: center;">This is my NodeJS Server!</h1>
            <div style="display: flex; justify-content: center;">
                <form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>
            </div>
        </body>
        </html>`);
        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                if (!err) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                } else return err
            });
        })
    }
}

//module.exports = requestHandler;
// module.exports = {
//     handler: requestHandler,
//     someText: 'This is a hard coded text!'
// };
// module.exports.handler = requestHandler;
exports = requestHandler;