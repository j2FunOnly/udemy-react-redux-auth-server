const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

mongoose.connect('mongodb://localhost/auth', {
  useNewUrlParser: true,
  useCreateIndex: true
});

// App setup
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening in:', port);
