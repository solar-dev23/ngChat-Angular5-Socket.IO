import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as passport from "passport";
import expressValidator = require("express-validator");
import * as cors from 'cors';
import config from './config/config.dev';
import initSocket from './sockets';

const app = express();

// Connect DB
require('./config/db');

// Connect Passport
require('./config/passport');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

// API location
require('./routes')(app);

// Set Port
const port = config.serverPort;
app.set('port', port);

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => console.log('Running on localhost:'+port));