const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// TODO: App setup

// Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening in:', port);
