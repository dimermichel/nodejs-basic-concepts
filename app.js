const http = require('http');

const routes = require('./routes');

require('dotenv').config();

const server = http.createServer(routes);

// process.exit(); Quit the server

server.listen(process.env.PORT);